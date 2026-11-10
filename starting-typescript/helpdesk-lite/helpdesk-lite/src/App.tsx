import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function App() {
  const tickets = useQuery(api.tickets.listTickets);
  const createTicket = useMutation(api.tickets.createTicket);
  const [title, setTitle] = useState("");

  if (tickets === undefined) return <p>Loading...</p>;

  return (
    <div>
      <h1>helpdesk-lite</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ticket title"
      />
      <button
        onClick={() => {
          createTicket({ title });
          setTitle("");
        }}
      >
        Add ticket
      </button>

      <ul>
        {tickets.map((t) => (
          <li key={t._id}>
            {t.title} ({t.status})
          </li>
        ))}
      </ul>
    </div>
  );
}