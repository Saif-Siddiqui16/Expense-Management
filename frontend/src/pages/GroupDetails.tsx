import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Member {
  user: User | null;
  email: string;
  uniqueId: string;
}

interface Group {
  _id: string;
  name: string;
  members: Member[];
}

interface Expense {
  _id: string;
  group: string;
  amount: number;
  description: string;
  paidBy: string;
  sharedWith: string[];
}

const GroupDetails = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [group, setGroup] = useState<Group | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const navigate = useNavigate();

  const fetchGroupDetail = async () => {
    try {
      const response = await api.get(`/group/${groupId}`);
      setGroup(response.data.groupDetail);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExpense = async () => {
    try {
      const response = await api.get(`/expense/${groupId}`);
      setExpenses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (groupId) {
      fetchGroupDetail();
      fetchExpense();
    }
  }, [groupId]);

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-900 text-white">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(`/dashboard`)}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate(`/expense/${groupId}`)}
          className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Expense
        </button>
      </div>

      {/* Group Info */}
      <div className="bg-zinc-800 rounded-lg p-6 shadow-lg">
        {group ? (
          <>
            <h1 className="text-4xl font-bold text-center bg-gradient-to-l from-blue-400 to-blue-700 bg-clip-text text-transparent mb-6 capitalize">
              {group.name}
            </h1>

            <div className="space-y-4">
              {group.members.map((member) => (
                <div
                  key={member.uniqueId}
                  className="flex justify-between items-center p-4 bg-zinc-700 rounded"
                >
                  <p>{member.email}</p>
                  {member.user === null ? (
                    <span className="text-yellow-400 font-bold">Pending</span>
                  ) : (
                    <span className="text-green-400 font-bold">Active</span>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center">No group found</p>
        )}
      </div>

      {/* Divider */}
      <div className="my-10 border-t-2 border-zinc-600"></div>

      {/* Expenses Section */}
      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Expenses</h2>
        {expenses.length === 0 ? (
          <p className="text-gray-400">No expenses recorded yet.</p>
        ) : (
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div
                key={expense._id}
                className="p-4 bg-zinc-700 rounded flex flex-col sm:flex-row sm:items-center justify-between"
              >
                <div>
                  <p className="text-lg font-semibold text-white capitalize">
                    {expense.description}
                  </p>
                  <p className="text-sm text-gray-400">
                    Paid by: <span className="text-blue-300">{expense.paidBy}</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Shared with:{" "}
                    <span className="text-amber-300">
                      {expense.sharedWith.join(", ")}
                    </span>
                  </p>
                </div>
                <div className="text-xl font-bold text-green-400 mt-2 sm:mt-0">
                  ₹{expense.amount}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetails;
