import { FormControl, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAddContactMutation, useGetContactsQuery } from 'redux/contactsAPI';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';



const phoneRegExp = /^\+380\d{9}$/;

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    phone: Yup.string()
        .length(13, 'Number must have 13 symbols')
        .trim()
        .matches(phoneRegExp, 'Phone number must be a valid Ukrainian phone number')
        .required('Required'),
});


export default function ContactsForm() {
  const [addContact] = useAddContactMutation();
  const { data: contactsData, isError } = useGetContactsQuery();

  const initialValues = {
    name: '',
    phone: '',
  };

  const handleAddContact = async (values, resetForm) => {
    const { name, phone } = values;

    if (!isError && contactsData) {
      const contactExists = contactsData.some(contact => contact.name === name || contact.number === phone);
      if (contactExists) {
        alert(`Contact with name "${name}" or number "${phone}" already exists!`); 
      } else {
        const formObj = {
          name,
          number: phone,
        };
        await addContact(formObj).unwrap();
        resetForm();
      }
    }
  };


  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => handleAddContact(values, resetForm)}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form>
          <FormControl
            noValidate
            autoComplete="off"
            sx={{
              minWidth: '350px',
              maxWidth: '500px',
              gap: '10px',
              margin: '0 auto',
            }}
          >
            <Field
              as={TextField}
              id="outlined-search"
              label="Full Name"
              name="name"
              type="text"
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
            <Field
              as={TextField}
              id="outlined-search"
              label="Phone"
              name="phone"
              type="tel"
              error={touched.phone && !!errors.phone}
              helperText={touched.phone && errors.phone}
            />
            <Typography variant="caption" color="text.secondary">
              Phone number must be a valid Ukrainian phone number
              (+380XXXXXXXXX)
            </Typography>
            <Button variant="contained" size="small" type="submit">
              Add contact
            </Button>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
}