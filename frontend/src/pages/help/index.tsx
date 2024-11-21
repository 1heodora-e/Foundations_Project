import { useState } from "react";
import { Search, Mail, Phone, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Input from "@/components/ui/Input";
import Layout from "@/components/Layout";

const faqs = [
  {
    category: "Appointments",
    questions: [
      {
        q: "How do I schedule a new appointment?",
        a: "To schedule a new appointment, go to the Appointments page and click the '+ New Appointment' button. Fill in the required information including patient details, preferred doctor, and the reason for visit.",
      },
      {
        q: "Can I reschedule an existing appointment?",
        a: "Yes, you can reschedule an appointment by finding it in the appointments table and clicking the edit icon. From there, you can modify the date and time as needed.",
      },
      {
        q: "How do I cancel an appointment?",
        a: "To cancel an appointment, locate it in the appointments table and click the delete icon. You'll be asked to confirm the cancellation before it's finalized.",
      },
    ],
  },
  {
    category: "Patients",
    questions: [
      {
        q: "How do I add a new patient to the system?",
        a: "Navigate to the Patients page and click '+ New Patient'. Fill in all required information including personal details and medical history.",
      },
      {
        q: "How can I update patient information?",
        a: "Find the patient in the patients table and click the edit icon. You can then modify any of their information as needed.",
      },
    ],
  },
  {
    category: "Doctors",
    questions: [
      {
        q: "How do I view a doctor's schedule?",
        a: "Go to the Doctors page, find the specific doctor, and click on their name. This will show you their complete schedule and availability.",
      },
      {
        q: "What should I do if a doctor is unavailable?",
        a: "If a doctor is unavailable, you can either choose another doctor with the same specialization or reschedule the appointment for when the preferred doctor is available.",
      },
    ],
  },
];

const quickGuides = [
  {
    title: "Getting Started",
    description: "Learn the basics of using the system",
    icon: "📚",
  },
  {
    title: "Appointment Management",
    description: "Master the appointment scheduling process",
    icon: "📅",
  },
  {
    title: "Patient Records",
    description: "Learn how to manage patient information",
    icon: "📋",
  },
  {
    title: "Reports & Analytics",
    description: "Understanding system analytics and reports",
    icon: "📊",
  },
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <Layout isAuthorized={true}>
      <main className="p-6 max-w-6xl mx-auto h-[90vh] overflow-x-scroll">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Help Center</h1>
          <p className="mt-2 text-gray-600">
            Find answers to common questions and learn how to use the system effectively
          </p>
        </div>

        {/* Search Section */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-2"
          />
        </div>

        {/* Quick Guides Grid */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Quick Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickGuides.map((guide) => (
              <div
                key={guide.title}
                className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer"
              >
                <div className="text-2xl mb-2">{guide.icon}</div>
                <h3 className="font-medium mb-1">{guide.title}</h3>
                <p className="text-sm text-gray-600">{guide.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          {filteredFaqs.map((category) => (
            <div key={category.category} className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-700">
                {category.category}
              </h3>
              <Accordion type="single" collapsible className="bg-white rounded-lg border border-gray-200">
                {category.questions.map((faq, index) => (
                  <AccordionItem key={index} value={`${category.category}-${index}`}>
                    <AccordionTrigger className="px-4 hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 text-gray-600">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </section>

        {/* Contact Support Section */}
        <section className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Need More Help?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is available to help you with any questions or issues you may have.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 text-gray-700">
              <Mail className="w-5 h-5" />
              <span>support@example.com</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Phone className="w-5 h-5" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <MessageCircle className="w-5 h-5" />
              <span>Live Chat Support</span>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}