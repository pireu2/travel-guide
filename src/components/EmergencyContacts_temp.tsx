import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import {
  ArrowLeft,
  Plus,
  Phone,
  Mail,
  MapPin,
  Shield,
  Ambulance,
  AlertTriangle,
  Heart,
  Users,
  Plane,
  Star,
  Share2,
  Download,
  Upload,
  Search,
  Filter,
  Clock,
  Globe,
  Stethoscope,
  Scale,
  UserCheck,
  Zap,
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
    <div className="min-h-screen bg-linear-to-br from-red-400 via-pink-400 to-rose-500 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => onNavigate("home")}
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Emergency Contacts
                </h1>
                <p className="text-white/80">
                  Stay safe with comprehensive emergency planning and quick
                  access contacts
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={shareLocation}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Location
                </Button>
                <Button
                  onClick={() => setShowQuickDial(!showQuickDial)}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
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

        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 backdrop-blur-xl bg-white/10 border border-white/20">
            <TabsTrigger
              value="contacts"
              className="data-[state=active]:bg-white/20"
            >
              Contacts
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="data-[state=active]:bg-white/20"
            >
              Services
            </TabsTrigger>
            <TabsTrigger
              value="medical"
              className="data-[state=active]:bg-white/20"
            >
              Medical Info
            </TabsTrigger>
            <TabsTrigger
              value="tips"
              className="data-[state=active]:bg-white/20"
            >
              Safety Tips
            </TabsTrigger>
          </TabsList>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add Contact */}
              <Card className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add Contact
                  </CardTitle>
                  <CardDescription>
                    Add important people for emergency situations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newContact.category}
                      onValueChange={(value: Contact["category"]) =>
                        setNewContact({ ...newContact, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {contactCategories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            <div className="flex items-center gap-2">
                              {cat.icon}
                              {cat.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship</Label>
                    <Input
                      id="relationship"
                      placeholder="e.g., Spouse, Doctor, Lawyer"
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
                      placeholder="Home or office address"
                      value={newContact.address}
                      onChange={(e) =>
                        setNewContact({
                          ...newContact,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Additional information..."
                      value={newContact.notes}
                      onChange={(e) =>
                        setNewContact({ ...newContact, notes: e.target.value })
                      }
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={addContact}
                    className="w-full bg-linear-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                    disabled={!newContact.name || !newContact.phone}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Contact
                  </Button>
                </CardContent>
              </Card>

              {/* Contacts List */}
              <Card className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Your Emergency Contacts</CardTitle>
                      <CardDescription>
                        {contacts.length} contact
                        {contacts.length !== 1 ? "s" : ""} •{" "}
                        {favoriteContacts.length} favorite
                        {favoriteContacts.length !== 1 ? "s" : ""}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search contacts..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-9 w-48"
                        />
                      </div>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger className="w-32">
                          <Filter className="w-4 h-4 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          {contactCategories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {contacts.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Emergency Readiness</span>
                        <span>{Math.round(completionRate)}%</span>
                      </div>
                      <Progress value={completionRate} className="h-2" />
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {filteredContacts.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">
                        No emergency contacts found
                      </p>
                      <p className="text-sm">
                        {contacts.length === 0
                          ? "Add your first emergency contact to get started."
                          : "Try adjusting your search or filter criteria."}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredContacts.map((contact) => {
                        const categoryInfo = contactCategories.find(
                          (cat) => cat.value === contact.category
                        );
                        return (
                          <div
                            key={contact.id}
                            className="p-4 border rounded-lg bg-linear-to-br from-white to-gray-50 hover:from-gray-50 hover:to-white transition-all duration-200 shadow-sm hover:shadow-md"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-lg">
                                    {contact.name}
                                  </h3>
                                  {contact.isFavorite && (
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  )}
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className={categoryInfo?.color}>
                                    {categoryInfo?.icon}
                                    <span className="ml-1">
                                      {categoryInfo?.label}
                                    </span>
                                  </Badge>
                                  {contact.relationship && (
                                    <span className="text-sm text-muted-foreground">
                                      {contact.relationship}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  onClick={() => toggleFavorite(contact.id)}
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <Star
                                    className={`w-4 h-4 ${
                                      contact.isFavorite
                                        ? "text-yellow-500 fill-current"
                                        : "text-gray-400"
                                    }`}
                                  />
                                </Button>
                                <Button
                                  onClick={() => callContact(contact.phone)}
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <Phone className="w-4 h-4" />
                                </Button>
                                <Button
                                  onClick={() => removeContact(contact.id)}
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  ×
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-medium">
                                  {contact.phone}
                                </span>
                              </div>

                              {contact.email && (
                                <div className="flex items-center gap-2">
                                  <Mail className="w-4 h-4 text-green-600" />
                                  <span className="text-sm">
                                    {contact.email}
                                  </span>
                                </div>
                              )}

                              {contact.address && (
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-purple-600" />
                                  <span className="text-sm">
                                    {contact.address}
                                  </span>
                                </div>
                              )}

                              {contact.notes && (
                                <div className="mt-3 p-2 bg-blue-50 rounded text-sm text-blue-800">
                                  {contact.notes}
                                </div>
                              )}

                              {contact.lastContacted && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                                  <Clock className="w-3 h-3" />
                                  Last contacted:{" "}
                                  {contact.lastContacted.toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Dial Panel */}
            {showQuickDial && (
              <Card className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Quick Dial
                  </CardTitle>
                  <CardDescription>
                    One-tap access to your most important emergency contacts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {favoriteContacts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Star className="w-8 h-8 mx-auto mb-4 opacity-50" />
                      <p>No favorite contacts yet</p>
                      <p className="text-sm">
                        Mark contacts as favorites for quick access
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {favoriteContacts.map((contact) => (
                        <Button
                          key={contact.id}
                          onClick={() => callContact(contact.phone)}
                          className="h-20 flex-col gap-2 bg-linear-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                        >
                          <Phone className="w-6 h-6" />
                          <span className="text-sm font-medium">
                            {contact.name}
                          </span>
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Emergency Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <Card className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Emergency Services
                </CardTitle>
                <CardDescription>
                  Critical numbers and services for different emergency
                  situations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {emergencyServices.map((service, index) => (
                    <div
                      key={index}
                      className="p-4 bg-linear-to-br from-white to-gray-50 rounded-lg border hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        {service.icon}
                        <div>
                          <div className="font-semibold">{service.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {service.category}
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-red-600 mb-2">
                        {service.number}
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        {service.description}
                      </div>
                      <Button
                        onClick={() => callContact(service.number)}
                        size="sm"
                        className="w-full bg-red-600 hover:bg-red-700"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-blue-900 mb-1">
                        International Travel
                      </div>
                      <div className="text-sm text-blue-800">
                        When traveling abroad, research and save local emergency
                        numbers. Common international emergency numbers include
                        112 (Europe), 999 (UK), 000 (Australia), and 119
                        (Japan).
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical Information Tab */}
          <TabsContent value="medical" className="space-y-6">
            <Card className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Medical Information
                </CardTitle>
                <CardDescription>
                  Critical medical details for emergency situations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Select
                        value={medicalInfo.bloodType}
                        onValueChange={(value) =>
                          setMedicalInfo({ ...medicalInfo, bloodType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Textarea
                        id="allergies"
                        placeholder="List any allergies (food, medication, environmental, etc.)"
                        value={medicalInfo.allergies}
                        onChange={(e) =>
                          setMedicalInfo({
                            ...medicalInfo,
                            allergies: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medications">Current Medications</Label>
                      <Textarea
                        id="medications"
                        placeholder="List current medications and dosages"
                        value={medicalInfo.medications}
                        onChange={(e) =>
                          setMedicalInfo({
                            ...medicalInfo,
                            medications: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="conditions">Medical Conditions</Label>
                      <Textarea
                        id="conditions"
                        placeholder="List any medical conditions or chronic illnesses"
                        value={medicalInfo.conditions}
                        onChange={(e) =>
                          setMedicalInfo({
                            ...medicalInfo,
                            conditions: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">
                        Emergency Contact for Medical
                      </Label>
                      <Input
                        id="emergencyContact"
                        placeholder="Name and relationship"
                        value={medicalInfo.emergencyContact}
                        onChange={(e) =>
                          setMedicalInfo({
                            ...medicalInfo,
                            emergencyContact: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="insurance">Insurance Provider</Label>
                      <Input
                        id="insurance"
                        placeholder="Insurance company name"
                        value={medicalInfo.insuranceProvider}
                        onChange={(e) =>
                          setMedicalInfo({
                            ...medicalInfo,
                            insuranceProvider: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="policyNumber">Policy Number</Label>
                      <Input
                        id="policyNumber"
                        placeholder="Insurance policy number"
                        value={medicalInfo.policyNumber}
                        onChange={(e) =>
                          setMedicalInfo({
                            ...medicalInfo,
                            policyNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    Export Medical Card
                  </Button>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Safety Tips Tab */}
          <TabsContent value="tips" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle>Before You Travel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">
                          Share Your Plans
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Tell trusted contacts about your itinerary,
                          accommodation details, and expected return time.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">
                          Register with Authorities
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Register your travel plans with your embassy or
                          consulate, especially for international travel.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">
                          Get Travel Insurance
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Ensure your insurance covers medical emergencies, trip
                          cancellations, and emergency evacuations.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">
                          Know Your Health Info
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Keep your blood type, allergies, and medical
                          conditions readily accessible.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle>While Traveling</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">
                          Secure Important Documents
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Keep passports, visas, and important documents in a
                          secure, waterproof location.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">Stay Aware</div>
                        <div className="text-sm text-muted-foreground">
                          Be conscious of your surroundings and trust your
                          instincts in unfamiliar situations.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">
                          Communication Plan
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Establish check-in times with emergency contacts and
                          have backup communication methods.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">
                          Learn Local Phrases
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Know how to say "help," "police," and "I need medical
                          attention" in the local language.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
