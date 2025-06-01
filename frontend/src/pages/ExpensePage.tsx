import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { useCallback, useEffect, useState } from "react";

interface User {
  _id: string;
  email: string;
  name: string;
}

interface Member {
  user: User | null;
  uniqueId: string;
  email: string;
}

interface Group {
  name: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  members: Member[];
}

const ExpensePage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [sharedWith, setSharedWith] = useState<string[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  const fetchGroup = useCallback(async () => {
    try {
      const response = await api.get(`/group/${groupId}`);
      const group: Group = response.data.groupDetail;

      const creatorEmail = group.createdBy.email;
      const filteredMembers = group.members.filter((m) => m.email !== creatorEmail);

      setMembers(filteredMembers);
      setSharedWith([creatorEmail]); // ✅ Set creator as default shared-with
    } catch (error) {
      console.error("Failed to fetch group:", error);
      alert("Error fetching group details.");
    }
  }, [groupId]);

  useEffect(() => {
    fetchGroup();
  }, [fetchGroup]);

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSharedWith((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((email) => email !== value)
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post(`/expense/${groupId}`, {
        amount,
        description,
        sharedWith,
      });
      if (response.status === 200) {
        setAmount(0);
        setDescription('');
        setSharedWith([]); // Optionally, refetch group to restore creator checkbox
        fetchGroup();
      }
    } catch (error) {
      console.error("Failed to submit expense:", error);
      alert("Error adding expense.");
    }
  };

  const handleInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post(`/group/invite/${groupId}`, { email });
      if (response.status === 200) {
        fetchGroup();
        setEmail('');
      }
    } catch (error) {
      console.error("Failed to invite member:", error);
      alert("Error inviting member.");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-zinc-900 text-white">
      <div className="max-w-4xl mx-auto bg-zinc-800 p-8 rounded-xl shadow-xl space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-blue-400">Add Expense</h1>
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
        </div>

        {/* Invite Member Form */}
        <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex flex-col w-full sm:w-auto">
            <label htmlFor="email" className="mb-1 text-sm font-medium">Invite by Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="p-2 rounded bg-zinc-700 border border-zinc-600 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full sm:w-auto"
          >
            Invite
          </button>
        </form>

        {/* Expense Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="amount" className="mb-1 font-medium text-sm">Amount</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setAmount(Number(value));
                }
              }}
              placeholder="Enter amount"
              className="p-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="mb-1 font-medium text-sm">Description</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Dinner, Uber Ride..."
              className="p-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-sm">Shared With</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {members.map((member) => (
                <label
                  key={member.uniqueId}
                  className="flex items-center gap-3 bg-zinc-700 p-3 rounded border border-zinc-600"
                >
                  <input
                    type="checkbox"
                    value={member.email}
                    checked={sharedWith.includes(member.email)} // ✅ pre-select logic
                    onChange={handleChecked}
                    className="accent-blue-500"
                  />
                  <span className="text-sm">{member.email}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition duration-200"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpensePage;
