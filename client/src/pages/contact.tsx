import { toast } from "react-hot-toast";
import { useState } from "react";
// Components
import Table from "../components/common/table";
import TopBar from "../components/common/topbar";
import Loading from "../components/common/loading";
import Error from "../components/common/error";
// Modals
import AddContactModal from "../modals/contacts/add-contact-modal";
import UpdateContactModal from "../modals/contacts/update-contact-modal";
// Hooks
import { useContacts, useAddContact, useUpdateContact, useDeleteContact} from "../hooks/contact.hook";
// Types
import type { Contact, CreateContact, UpdateContact} from "../types/contacts.types";
import type { Column } from "../components/common/table";

const ContactsPage = () => {
  const { data: contacts, isLoading, isError, error} = useContacts();
  const { mutate: addContact, status : addContactStatus } = useAddContact();
  const { mutate: updateContact, status : updateContactStatus} = useUpdateContact();
  const { mutate: deleteContact} = useDeleteContact();



  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [initialDataForUpdate, setInitialDataForUpdate] = useState<UpdateContact | undefined>(undefined);

  const handleAddContact = (data: CreateContact, resetFields: () => void) => {
    addContact(data, {
      onSuccess: () => {
        toast.success("Contact added successfully!");
        resetFields();
        setIsAddModalOpen(false);
      },
    });
  };

  const handleUpdateContact = (data: UpdateContact) => {
    updateContact(data, {
      onSuccess: () => {
        toast.success("Contact updated successfully!");
        setIsUpdateModalOpen(false);
      },
    });
  };

    const handleDeleteContact = (_id: string) => {
    deleteContact(_id, {
      onSuccess: () => {
        toast.success("Contact deleted successfully!");
      },
    });
  };

  // Columns definition
  const columns : Column<Contact>[] = [
  { key: "reference", title: "Reference" },
  { key: "title", title: "Title" },
  { key: "firstname", title: "First Name" },
  { key: "surname", title: "Last Name" },
  { key: "contact", title: "Phone" },
  { key: "email", title: "Email" },
];

  if (isLoading) return <Loading/>

  if (isError) return <Error error={error}/>
   
  return (
    <>
      <TopBar
        title="Contacts"
        definition="Create and manage your contacts here"
        action={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primaryDark text-white px-4 py-2 rounded cursor-pointer"
          >
            Add Contact
          </button>
        }
      />

      <main className="flex min-h-screen flex-col items-center justify-between p-6">
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          <Table<Contact>
            data={contacts || []}
            columns={columns}
            actions={{
              edit: (row) => {
                setInitialDataForUpdate(row);
                setIsUpdateModalOpen(true);
              },
              delete: (row) => {handleDeleteContact(row._id)},
            }}
          />
        </div>
      </main>

      {/* Add Contact Modal */}
      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddContact}
        isLoading={addContactStatus === "pending"}
      />

      {/* Add Contact Modal */}
      <UpdateContactModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdateContact}
        isLoading={updateContactStatus === "pending"}
        initialData={initialDataForUpdate}
      />
    </>
  );
};

export default ContactsPage;

