import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ChartData, Loan } from "../../lib/types";
import { useEffect, useState } from "react";

const processLoanDataForChart = (loans: Loan[]): ChartData[] => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentYear = new Date().getFullYear();

  const chartData: ChartData[] = monthNames.map((month) => ({
    month,
    approved: 0,
    rejected: 0,
    pending: 0,
  }));

  loans.forEach((loan) => {
    const loanDate = new Date(loan.createdAt);
    const loanYear = loanDate.getFullYear();

    if (loanYear === currentYear) {
      const monthIndex = loanDate.getMonth();
      const monthData = chartData[monthIndex];

      switch (loan.status) {
        case "APPROVED":
        case "DISBURSED":
          monthData.approved++;
          break;
        case "REJECTED":
          monthData.rejected++;
          break;
        case "PENDING":
        case "PENDING_VERIFICATION":
          monthData.pending++;
          break;
      }
    }
  });

  return chartData;
};

// ✅ Dummy loan data
const dummyLoans: Loan[] = [
  {
    id: 1,
    category: { name: "Personal Loan" },
    amount: "5000",
    approvedAmount: "4500",
    status: "APPROVED",
    interestRate: 5,
    durationMonths: 12,
    startDate: null,
    endDate: null,
    createdAt: new Date(2025, 0, 15).toISOString(), // January
    updatedAt: new Date().toISOString(),
    member: { first_name: "John", last_name: "Doe" },
    reference: "REF001",
    approvedBy: { id: "1", full_name: "Admin User", email: "admin@test.com" },
    rejectedBy: { id: "", full_name: "", email: "" },
  },
  {
    id: 2,
    category: { name: "Car Loan" },
    amount: "10000",
    approvedAmount: "0",
    status: "REJECTED",
    interestRate: 8,
    durationMonths: 24,
    startDate: null,
    endDate: null,
    createdAt: new Date(2025, 2, 10).toISOString(), // March
    updatedAt: new Date().toISOString(),
    member: { first_name: "Jane", last_name: "Smith" },
    reference: "REF002",
    approvedBy: { id: "", full_name: "", email: "" },
    rejectedBy: {
      id: "2",
      full_name: "Reviewer User",
      email: "reviewer@test.com",
    },
  },
  {
    id: 3,
    category: { name: "Business Loan" },
    amount: "20000",
    approvedAmount: "0",
    status: "PENDING",
    interestRate: 10,
    durationMonths: 36,
    startDate: null,
    endDate: null,
    createdAt: new Date(2025, 4, 20).toISOString(), // May
    updatedAt: new Date().toISOString(),
    member: { first_name: "Alice", last_name: "Johnson" },
    reference: "REF003",
    approvedBy: { id: "", full_name: "", email: "" },
    rejectedBy: { id: "", full_name: "", email: "" },
  },
];

export default function DashboardChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    // For now, we just use dummy data
    const processedData = processLoanDataForChart(dummyLoans);
    setChartData(processedData);
  }, []);

  return (
    <div className="h-[400px] bg-white p-4 rounded-lg shadow mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Loan Applications (2025)</h2>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barSize={7}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="approved"
            fill="#2D9CDB"
            name="Approved Loans"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="rejected"
            fill="#FF6B6B"
            name="Rejected Loans"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="pending"
            fill="#FFD93D"
            name="Pending Loans"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
