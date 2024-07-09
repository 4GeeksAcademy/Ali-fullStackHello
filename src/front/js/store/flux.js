const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			host: "https://playground.4geeks.com/contact/",
			slug: "",
			agenda: [],
			contacts: [],
			isAgenda: false,
			currentContact: {}

		},
		actions: {
			// Funcion to create agenda
			createAgenda: async () => {
				const url = `${getStore().host}agendas/${getStore().slug}`
				console.log(url);
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
				}
				const response = await fetch(url, options)
				console.log(response);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					getActions().getContact()
					return
				}
				const data = await response.json()
				console.log(data, "response");
				setStore({ slug: data.slug, isAgenda: true });
			},
			// Function to define Agenda's name
			setAgendaName: (slug) => {
				console.log(slug);
				setStore({ slug: slug });
			},
			// Funcion to create contact
			createContact: async (newContact) => {
				const url = `${getStore().host}agendas/${getStore().slug}/contacts`
				const dataToSend = newContact;
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dataToSend)
				}
				const response = await fetch(url, options)
				console.log(response);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return
				}
				const data = await response.json()
				console.log(data);
				getActions().getContact()
			},
			// Function to bring Agenda
			getAgenda: async () => {
				const url = `${getStore().host}agendas/${getStore().slug}`
				const options = {
					method: "GET"
				};
				const response = await fetch(url, options);
				if (!response.ok) {
					console.log('error: ', response.status, response.statusText);
					return;
				}
				const data = await response.json();
				console.log(data.contacts);
				setStore({ agenda: data.contacts });
			},
			// Function to bring contact
			getContact: async () => {
				const url = `${getStore().host}agendas/${getStore().slug}/contacts`
				const options = {
					method: "GET"
				};
				const response = await fetch(url, options);
				if (!response.ok) {
					console.log('error: ', response.status, response.statusText);
					return;
				}
				const data = await response.json();
				console.log(data);
				setStore({ contacts: data.contacts, isAgenda: true });
			},
			// Function to delete contact
			deleteContact: async (contact) => {
				console.log(contact);
				const uri = `${getStore().host}agendas/${getStore().slug}/contacts/${contact.id}`
				const options = {
					method: 'DELETE'
				}
				const response = await fetch(uri, options)
				console.log(response);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				}
				getActions().getContact()
			},
			// Function to edit contact
			editContact: (contact) => {
			// Setear datos en currentContact
			setStore({currentContact: contact})
			},

			saveEditContact: async (contact, id) => {
				const uri = `${getStore().host}agendas/${getStore().slug}/contacts/${id}`
				const dataToSend = contact;
				const options = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					  },
					body: JSON.stringify(dataToSend)

				}
				const response = await fetch(uri, options)
				console.log(response);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return
				}
				const data = await response.json()
				console.log(data);
				getActions().getContact()
				
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });

			}
		}
	};
};

export default getState;
