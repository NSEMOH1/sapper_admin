import { Badge, Button } from "@chakra-ui/react";
import DataTable from "../../components/table";
import type { Member, TableColumn } from "../../lib/types";
import { useMemo, useState, useEffect } from "react";
import UserDetailsView from "./userDetails";

const dummyMembers: Member[] = [
  {
    id: 1,
    email: "john.doe@example.com",
    first_name: "John",
    title: "Mr",
    last_name: "Doe",
    other_name: "Michael",
    gender: "Male",
    phone: "08012345678",
    address: "123 Broad Street, Lagos",
    state_of_origin: "Lagos",
    role: "Member",
    type: "Regular",
    lga: "Ikeja",
    date_of_birth: "1990-05-20",
    created_at: "2024-01-01T10:00:00Z",
    updated_at: "2024-01-15T12:30:00Z",
    profile_picture: "https://via.placeholder.com/150",
    totalSavings: 50000,
    monthlyDeduction: 5000,
    service_number: "NAF2022",
    status: "APPROVED",
    Personel: {
      rank: "Captain",
    },
    bank: [{ account_number: "1234567890", name: "GTBank" }],
  },
  {
    id: 2,
    email: "jane.smith@example.com",
    first_name: "Jane",
    title: "Mrs",
    last_name: "Smith",
    other_name: "Elizabeth",
    gender: "Female",
    phone: "08087654321",
    address: "456 Marina Road, Abuja",
    state_of_origin: "Abuja",
    role: "Staff",
    type: "Executive",
    lga: "Garki",
    date_of_birth: "1985-08-12",
    created_at: "2024-02-10T09:00:00Z",
    updated_at: "2024-03-01T14:00:00Z",
    profile_picture: "https://via.placeholder.com/150",
    totalSavings: 30000,
    monthlyDeduction: 4000,
    service_number: "NAF2024",
    status: "PENDING",
    Personel: {
      rank: "Lieutenant",
    },
    bank: [{ account_number: "9876543210", name: "Access Bank" }],
  },
  {
    id: 3,
    email: "mark.johnson@example.com",
    first_name: "Mark",
    title: "Mr",
    last_name: "Johnson",
    other_name: "David",
    gender: "Male",
    phone: "08099887766",
    address: "789 Kingsway Road, Port Harcourt",
    state_of_origin: "Rivers",
    role: "Admin",
    type: "Regular",
    lga: "Obio-Akpor",
    date_of_birth: "1992-11-03",
    created_at: "2024-04-05T11:30:00Z",
    updated_at: "2024-04-10T16:20:00Z",
    profile_picture: "https://via.placeholder.com/150",
    totalSavings: 70000,
    monthlyDeduction: 6000,
    service_number: "NAF2074",
    status: "REJECTED",
    Personel: {
      rank: "Major",
    },
    bank: [{ account_number: "1122334455", name: "UBA" }],
  },
];

const userColumns: TableColumn<Member>[] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 70,
    render: (id: number) => <span className="font-semibold">{id}</span>,
  },
  {
    title: "First Name",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Rank",
    dataIndex: "Personel",
    key: "rank",
    render: (personel: { rank: string }) => (
      <span>{personel?.rank || "N/A"}</span>
    ),
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phoneNumber",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (email: string) => (
      <a href={`mailto:${email}`} className="text-blue-500 hover:underline">
        {email}
      </a>
    ),
  },
  {
    title: "SVN",
    dataIndex: "service_number",
    key: "regNumber",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: "APPROVED" | "PENDING" | "REJECTED") => (
      <Badge
        colorScheme={
          status === "APPROVED"
            ? "green"
            : status === "PENDING"
            ? "yellow"
            : "red"
        }
        px={3}
        py={1}
        borderRadius="full"
        textTransform="capitalize"
      >
        {status}
      </Badge>
    ),
  },
];

const buttons = [
  { name: "Total Members", filter: "all" },
  { name: "Approved Members", filter: "APPROVED" },
  { name: "Pending Members", filter: "PENDING" },
  { name: "Rejected Members", filter: "REJECTED" },
];

export default function DashboardTable() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [paginationState, setPaginationState] = useState({
    page: 1,
    limit: 10,
  });

  // 🔹 Local state instead of API
  const [members, setMembers] = useState<Member[]>(dummyMembers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: dummyMembers.length,
  });

  const handleRowClick = (record: Member) => {
    setSelectedMember(record);
  };

  const handleBackToList = () => {
    setSelectedMember(null);
  };

  const loadMembers = ({
    page,
    limit,
    status,
  }: {
    page: number;
    limit: number;
    status?: "APPROVED" | "PENDING" | "REJECTED";
  }) => {
    setLoading(true);
    setTimeout(() => {
      let filtered = dummyMembers;
      if (status) {
        filtered = dummyMembers.filter((m) => m.status === status);
      }
      setMembers(filtered);
      setPagination({
        page,
        limit,
        total: filtered.length,
      });
      setLoading(false);
    }, 500); // simulate network delay
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    loadMembers({
      page: 1,
      limit: 10,
      status:
        filter === "all"
          ? undefined
          : (filter as "APPROVED" | "PENDING" | "REJECTED"),
    });
  };

  const handleTableChange = (pagination: any) => {
    setPaginationState({
      page: pagination.current,
      limit: pagination.pageSize,
    });
    loadMembers({
      page: pagination.current,
      limit: pagination.pageSize,
      status:
        activeFilter === "all"
          ? undefined
          : (activeFilter as "APPROVED" | "PENDING" | "REJECTED"),
    });
  };

  useEffect(() => {
    loadMembers({
      page: paginationState.page,
      limit: paginationState.limit,
    });
  }, []);

  const filteredMembers = useMemo(() => {
    if (activeFilter === "all") {
      return members;
    }
    return members.filter((member) => member.status === activeFilter);
  }, [members, activeFilter]);

  const statusCounts = useMemo(() => {
    const approved = members.filter(
      (member) => member.status === "APPROVED"
    ).length;
    const pending = members.filter(
      (member) => member.status === "PENDING"
    ).length;
    const rejected = members.filter(
      (member) => member.status === "REJECTED"
    ).length;

    return {
      all: members.length,
      APPROVED: approved,
      PENDING: pending,
      REJECTED: rejected,
    };
  }, [members]);

  const buttonsWithCounts = buttons.map((button) => ({
    ...button,
    name: `${button.name} (${
      statusCounts[button.filter as keyof typeof statusCounts] ?? 0
    })`,
  }));

  if (selectedMember) {
    return (
      <div className="mt-7">
        <Button onClick={handleBackToList} mb={4} variant="outline">
          Back to List
        </Button>

        <UserDetailsView data={selectedMember} />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-7">
      <div className="mb-6 flex flex-wrap gap-3">
        {buttonsWithCounts.map((button, index) => (
          <Button
            key={index}
            onClick={() => handleFilterClick(button.filter)}
            variant={activeFilter === button.filter ? "solid" : "outline"}
            colorScheme={activeFilter === button.filter ? "blue" : "gray"}
            size="sm"
            className="transition-all duration-200"
            isLoading={loading}
          >
            {button.name}
          </Button>
        ))}
      </div>
      <DataTable
        data={filteredMembers}
        columns={userColumns}
        rowKey="id"
        showExport={true}
        showFilters={true}
        tableHeaderBg="#F1F4F9"
        tableHeaderColor="black"
        onRowClick={handleRowClick}
        loading={loading}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          total: pagination.total,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
}
