import PropTypes from 'prop-types';
import ContactListItem from 'components/ContactListItem/ContactListItem';
import css from './ComtactList.module.css';

const ContactList = ({ contacts, filter, onDeleteContact }) => {
  return (
    <div className={css.contact__container}>
      <ul className={css.contact__list}>
        {contacts
          .filter(el => el.name.toLowerCase().includes(filter.toLowerCase()))
          .map(contact => (
            <ContactListItem
              key={contact.id}
              id={contact.id}
              name={contact.name}
              number={contact.number}
              onDeleteContact={onDeleteContact}
            />
          ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
