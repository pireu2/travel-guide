import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import Navigation from "./Navigation";
import {
  Plus,
  Phone,
  Mail,
  MapPin,
  Shield,
  Ambulance,
  AlertTriangle,
  Users,
  Share2,
  Zap,
  Stethoscope,
  Scale,
  Plane,
  UserCheck,
} from "lucide-react";

interface EmergencyContactsProps {
  onNavigate: (page: string) => void;
}

interface Contact {
  id: string;
  name: string;
  relationship: string;
  category: "family" | "medical" | "legal" | "travel" | "other";
  phone: string;
  email: string;
  address: string;
  notes: string;
  isFavorite: boolean;
  lastContacted?: Date;
}

interface MedicalInfo {
  bloodType: string;
  allergies: string;
  medications: string;
  conditions: string;
  emergencyContact: string;
  insuranceProvider: string;
  policyNumber: string;
}

interface EmergencyService {
  name: string;
  number: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

const emergencyServices: EmergencyService[] = [
  {
    name: "Emergency Services",
    number: "911",
    description: "General emergency - police, fire, medical",
    icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
    category: "General",
  },
  {
    name: "Medical Emergency",
    number: "911",
    description: "Ambulance and medical assistance",
    icon: <Ambulance className="w-5 h-5 text-red-600" />,
    category: "Medical",
  },
  {
    name: "Police",
    number: "911",
    description: "Law enforcement and safety",
    icon: <Shield className="w-5 h-5 text-blue-600" />,
    category: "Safety",
  },
  {
    name: "Fire Department",
    number: "911",
    description: "Fire emergency response",
    icon: <AlertTriangle className="w-5 h-5 text-orange-600" />,
    category: "Safety",
  },
  {
    name: "Poison Control",
    number: "1-800-222-1222",
    description: "Poison and drug emergency information",
    icon: <AlertTriangle className="w-5 h-5 text-green-600" />,
    category: "Medical",
  },
  {
    name: "Coast Guard",
    number: "911",
    description: "Maritime emergencies and rescues",
    icon: <Shield className="w-5 h-5 text-blue-700" />,
    category: "Safety",
  },
];

const contactCategories = [
  {
    value: "family",
    label: "Family",
    icon: <Users className="w-4 h-4" />,
    color: "bg-blue-100 text-blue-800",
  },
  {
    value: "medical",
    label: "Medical",
    icon: <Stethoscope className="w-4 h-4" />,
    color: "bg-red-100 text-red-800",
  },
  {
    value: "legal",
    label: "Legal",
    icon: <Scale className="w-4 h-4" />,
    color: "bg-purple-100 text-purple-800",
  },
  {
    value: "travel",
    label: "Travel",
    icon: <Plane className="w-4 h-4" />,
    color: "bg-green-100 text-green-800",
  },
  {
    value: "other",
    label: "Other",
    icon: <UserCheck className="w-4 h-4" />,
    color: "bg-gray-100 text-gray-800",
  },
];

export default function EmergencyContacts({
  onNavigate,
}: EmergencyContactsProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [medicalInfo, setMedicalInfo] = useState<MedicalInfo>({
    bloodType: "",
    allergies: "",
    medications: "",
    conditions: "",
    emergencyContact: "",
    insuranceProvider: "",
    policyNumber: "",
  });
  const [newContact, setNewContact] = useState({
    name: "",
    relationship: "",
    category: "family" as Contact["category"],
    phone: "",
    email: "",
    address: "",
    notes: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showQuickDial, setShowQuickDial] = useState(false);
  const [locationShared, setLocationShared] = useState(false);

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: Contact = {
        id: Date.now().toString(),
        ...newContact,
        isFavorite: false,
      };
      setContacts([...contacts, contact]);
      setNewContact({
        name: "",
        relationship: "",
        category: "family",
        phone: "",
        email: "",
        address: "",
        notes: "",
      });
    }
  };

  const removeContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  // Mock location sharing functionality
  const shareLocation = () => {
    setLocationShared(true);
    setTimeout(() => setLocationShared(false), 5000);
  };

  const toggleFavorite = (id: string) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact
      )
    );
  };

  const callContact = (phone: string) => {
    window.open(`tel:${phone}`, "_self");
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || contact.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const favoriteContacts = contacts.filter((contact) => contact.isFavorite);
  const completionRate =
    contacts.length > 0
      ? (contacts.filter((c) => c.isFavorite).length / contacts.length) * 100
      : 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation onNavigate={onNavigate} currentPage="emergency" />

      <div className="max-w-7xl mx-auto relative z-10 pt-16 md:pt-20">
        {/* Header */}
        <br />
        <div className="mb-8">
          <div className="backdrop-blur-3xl bg-white/90 border border-white/60 shadow-2xl shadow-white/15 ring-1 ring-white/25 rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Emergency Contacts
                </h1>
                <p className="text-gray-600">
                  Stay safe with comprehensive emergency planning and quick
                  access contacts
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={shareLocation}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Location
                </Button>
                <Button
                  onClick={() => setShowQuickDial(!showQuickDial)}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Quick Dial
                </Button>
              </div>
            </div>

            {locationShared && (
              <Alert className="mt-4 bg-green-50 border-green-200">
                <AlertTriangle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Location shared successfully! Your emergency contacts have
                  been notified.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Contact */}
          <div className="backdrop-blur-3xl bg-white/90 border border-white/60 shadow-2xl shadow-white/15 ring-1 ring-white/25 rounded-2xl overflow-hidden">
            <div className="p-6">
              <h3 className="text-gray-900 text-lg font-semibold mb-2">
                Add Emergency Contact
              </h3>
              <p className="text-gray-600 mb-4">
                Add people to contact in case of emergency
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Full name"
                    value={newContact.name}
                    onChange={(e) =>
                      setNewContact({ ...newContact, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Input
                    id="relationship"
                    placeholder="e.g., Spouse, Parent, Friend"
                    value={newContact.relationship}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        relationship: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    value={newContact.phone}
                    onChange={(e) =>
                      setNewContact({ ...newContact, phone: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={newContact.email}
                    onChange={(e) =>
                      setNewContact({ ...newContact, email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="Home address"
                    value={newContact.address}
                    onChange={(e) =>
                      setNewContact({ ...newContact, address: e.target.value })
                    }
                  />
                </div>

                <Button
                  onClick={addContact}
                  className="w-full bg-linear-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Contact
                </Button>
              </div>
            </div>
          </div>

          {/* Emergency Services */}
          <div className="backdrop-blur-3xl bg-white/90 border border-white/60 shadow-2xl shadow-white/15 ring-1 ring-white/25 rounded-2xl overflow-hidden">
            <div className="p-6">
              <h3 className="text-gray-900 text-lg font-semibold mb-2">
                Emergency Services
              </h3>
              <p className="text-gray-600 mb-4">
                Important numbers to remember
              </p>

              <div className="space-y-4">
                {emergencyServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border border-red-200"
                  >
                    {service.icon}
                    <div className="flex-1">
                      <div className="font-semibold text-red-900">
                        {service.name}
                      </div>
                      <div className="text-2xl font-bold text-red-600">
                        {service.number}
                      </div>
                      <div className="text-sm text-red-700">
                        {service.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-yellow-900 mb-1">
                      Travel Tip
                    </div>
                    <div className="text-sm text-yellow-800">
                      Save these numbers in your phone and keep them accessible.
                      Also note your country's emergency number when traveling
                      abroad.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contacts List */}
        <div className="mt-6 backdrop-blur-3xl bg-white/90 border border-white/60 shadow-2xl shadow-white/15 ring-1 ring-white/25 rounded-2xl overflow-hidden">
          <div className="p-6">
            <h3 className="text-gray-900 text-lg font-semibold mb-2">
              Your Emergency Contacts
            </h3>
            <p className="text-gray-600 mb-4">
              People to contact in case of emergency
            </p>

            {contacts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No emergency contacts added yet. Add your first contact above.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {contact.name}
                        </h3>
                        {contact.relationship && (
                          <p className="text-sm text-gray-600">
                            {contact.relationship}
                          </p>
                        )}
                      </div>
                      <Button
                        onClick={() => removeContact(contact.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        ×
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-700">
                          {contact.phone}
                        </span>
                      </div>

                      {contact.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-700">
                            {contact.email}
                          </span>
                        </div>
                      )}

                      {contact.address && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-gray-700">
                            {contact.address}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Travel Safety Tips */}
        <div className="mt-6 backdrop-blur-3xl bg-white/90 border border-white/60 shadow-2xl shadow-white/15 ring-1 ring-white/25 rounded-2xl overflow-hidden">
          <div className="p-6">
            <h3 className="text-gray-900 text-lg font-semibold mb-4">
              Travel Safety Tips
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-900">
                  Before You Travel
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Share your itinerary with emergency contacts</li>
                  <li>• Register with your embassy or consulate</li>
                  <li>• Get travel insurance with emergency coverage</li>
                  <li>• Know your blood type and allergies</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-gray-900">
                  While Traveling
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Keep important documents in a secure place</li>
                  <li>• Stay aware of your surroundings</li>
                  <li>• Have a communication plan with your contacts</li>
                  <li>• Know how to say emergency phrases in local language</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
}
