import { Avatar, Badge, Card, CardBody } from "@chakra-ui/react";
import DataTable from "../../components/table";
import { useMemo, useState } from "react";
import userIcon from "../../assets/oluyede.png";
import { LibraryBig, TrendingUpDownIcon } from "lucide-react";

interface Saving {
  id: string | number;
  name: string;
  serviceNumber: string;
  email: string;
  phone: string;
  savingsType: "Normal" | "Cooperative";
  amount: number;
}

const dummySavings: Saving[] = [
  {
    id: 1,
    name: "John Doe",
    serviceNumber: "81NA/45758",
    email: "john.doe@example.com",
    phone: "+2348012345678",
    savingsType: "Normal",
    amount: 50000,
  },
  {
    id: 2,
    name: "Jane Smith",
    serviceNumber: "81NA/45758",
    email: "jane.smith@example.com",
    phone: "+2348098765432",
    savingsType: "Cooperative",
    amount: 120000,
  },
  {
    id: 3,
    name: "Michael Johnson",
    serviceNumber: "81NA/45758",
    email: "michael.j@example.com",
    phone: "+2348056781234",
    savingsType: "Normal",
    amount: 80000,
  },
];

// Columns
const savingsColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name: string) => (
      <span className="flex items-center gap-2 font-medium">
        <Avatar src={userIcon} size="sm" /> {name}
      </span>
    ),
  },
  {
    title: "Service Number",
    dataIndex: "serviceNumber",
    key: "serviceNumber",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Savings Type",
    dataIndex: "savingsType",
    key: "savingsType",
    render: (type: string) => (
      <Badge
        colorScheme={type === "Normal" ? "blue" : "green"}
        px={3}
        py={1}
        borderRadius="full"
      >
        {type}
      </Badge>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (amount: number) => (
      <span className="font-semibold">₦{amount.toLocaleString()}</span>
    ),
  },
];

const Savings = () => {
  const [savings] = useState<Saving[]>(dummySavings);

  const totalAmount = useMemo(
    () => savings.reduce((sum, s) => sum + s.amount, 0),
    [savings]
  );

  return (
    <div className="mt-10">
      <Card
        className="w-[300px] transition-all mb-10 duration-300 ease-in-out hover:border-black hover:border-2 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      >
        <CardBody className="shadow-lg">
          <div className="flex justify-between items-center gap-6">
            <div>
              <p className="text-sm text-gray-600">Total Savings</p>
              <p className="text-2xl font-bold">₦{totalAmount}</p>
            </div>
            <div
              className="p-2 rounded-lg transition-transform duration-300 hover:scale-110"
              style={{ background: '#9F7AEA' }}
            >
              <LibraryBig size={20} color="white" />
            </div>
          </div>
          <p className="flex items-center gap-2 pt-4 text-sm text-gray-500">
            <TrendingUpDownIcon size={16} color="#38A169" />
            <p>20% from yesterday</p>
          </p>
        </CardBody>
      </Card>
      <DataTable
        data={savings}
        columns={savingsColumns}
        rowKey="id"
        tableHeaderBg="#F1F4F9"
        tableHeaderColor="black"
      />
    </div>
  );
};

export default Savings;
