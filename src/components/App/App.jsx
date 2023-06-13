import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    filter: '',
  };

  formSubmitHandler = data => {
    const { id, name, number } = data;
    const { contacts } = this.state;
    const sameContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (sameContact) {
      alert(`${name} is already in contacts!`);
      return;
    }

    const newContact = {
      id: id,
      name: name,
      number: number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  filterChangeHandler = event => {
    const filter = event.currentTarget.value;
    this.setState({ filter });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    return (
      <div className={css.app__container}>
        <h1 className={css.app__title}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <h2 className={css.app__subTitle}>Contacts</h2>
        <Filter onChangeInputFilter={this.filterChangeHandler} />
        <ContactList
          contacts={this.state.contacts}
          filter={this.state.filter}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
  onSubmit: PropTypes.func,
};
