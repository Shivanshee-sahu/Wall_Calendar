import { Settings, Moon, Bell, Globe, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const settingsItems = [
  { icon: Moon, label: "Appearance", description: "Theme and display preferences" },
  { icon: Bell, label: "Notifications", description: "Manage alert preferences" },
  { icon: Globe, label: "Language", description: "Choose your preferred language" },
  { icon: Shield, label: "Privacy", description: "Security and data settings" },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-2xl bg-card p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Settings</h2>
        </div>

        <div className="space-y-2">
          {settingsItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="group flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left transition-all duration-200 hover:bg-secondary active:scale-[0.99]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
