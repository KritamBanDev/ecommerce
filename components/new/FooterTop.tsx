import { Clock, Mail, MapPin, Phone } from "lucide-react";

interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const data: ContactItemData[] = [
  {
    title: "Visit Us",
    subtitle: "Jhapa, Nepal",
    icon: (
      <MapPin className="h-6 w-6 text-gray-600 group-hover:text-darkColor transition-colors" />
    ),
  },
  {
    title: "Call Us",
    subtitle: "+977 9815963688",
    icon: (
      <Phone className="h-6 w-6 text-gray-600 group-hover:text-darkColor transition-colors" />
    ),
  },
  {
    title: "Working Hours",
    subtitle: "Sun - Fri:  9:00 AM - 7:00 PM",
    icon: (
      <Clock className="h-6 w-6 text-gray-600 group-hover:text-darkColor transition-colors" />
    ),
  },
  {
    title: "Email Us",
    subtitle: "kritamban2003@gmail.com",
    icon: (
      <Mail className="h-6 w-6 text-gray-600 group-hover:text-darkColor transition-colors" />
    ),
  },
];

const FooterTop = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b bg-gradient-to-r from-fuchsia-50 via-white to-fuchsia-100 py-8 px-2 md:px-8">
      {data.map((item, index) => (
        <ContactItem
          key={index}
          icon={item.icon}
          title={item.title}
          content={item.subtitle}
        />
      ))}
    </div>
  );
};

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const ContactItem = ({ icon, title, content }: ContactItemProps) => {
  return (
    <div className="flex items-center gap-4 group hover:bg-fuchsia-50/80 p-5 rounded-xl shadow-sm transition-all duration-200 border border-fuchsia-100 hover:scale-105">
      <div className="flex-shrink-0 bg-fuchsia-100 rounded-full p-2 shadow group-hover:bg-fuchsia-200 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 group-hover:text-fuchsia-700 text-lg transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mt-1 group-hover:text-gray-900 transition-colors">
          {content}
        </p>
      </div>
    </div>
  );
};

export default FooterTop;