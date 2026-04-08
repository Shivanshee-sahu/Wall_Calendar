import { Users, Mail, Phone } from "lucide-react";

const contacts = [
  { name: "Sarah Johnson", role: "Product Designer", color: "bg-task-meeting" },
  { name: "Alex Chen", role: "Frontend Developer", color: "bg-task-research" },
  { name: "Maria Lopez", role: "Project Manager", color: "bg-task-design" },
  { name: "David Kim", role: "UX Researcher", color: "bg-task-review" },
];

export default function ContactsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-2xl bg-card p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Contacts</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contacts.map((contact, i) => (
            <div
              key={contact.name}
              className="group flex items-center gap-4 rounded-2xl border border-border p-4 transition-all duration-300 hover:shadow-card hover:-translate-y-0.5"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-full ${contact.color} text-sm font-bold text-primary-foreground shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                {contact.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{contact.name}</p>
                <p className="text-xs text-muted-foreground">{contact.role}</p>
              </div>
              <div className="flex gap-1">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-secondary hover:text-primary">
                  <Mail className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-secondary hover:text-primary">
                  <Phone className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
