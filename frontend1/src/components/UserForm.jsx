import React, { useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCreateUserMutation, useUpdateUserMutation, useGetUserByIdQuery, useGetUsersQuery } from '../reducers/appslice';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateUser] = useUpdateUserMutation();
  const formikRef = useRef(null);
  const { refetch } = useGetUsersQuery(); // React Query hook for refetching data


  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    address: Yup.string().required('Address is required'),
    phoneNumber: Yup.string().matches(/^[0-9]+$/, 'Phone number must only contain numeric digits').length(10, 'Phone number must be 10 digits').required('Phone number is required'),
    dateOfBirth: Yup.date().required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
    nationality: Yup.string().required('Nationality is required'),
    occupation: Yup.string().required('Occupation is required'),
    interests: Yup.string().required('Interests are required'),
    additionalNotes: Yup.string()
  });

  const [createUser] = useCreateUserMutation();
  const { data: user, isLoading } = useGetUserByIdQuery(id);

  useEffect(() => {
    if (user) {
      formikRef.current.setValues(user); // Update form values with latest fetched data
    }
  }, [user]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (id) {
        await updateUser({ id, ...values });
        await refetch(); // Refetch data after successful update
        navigate('/userlists'); // Navigate to userlists upon successful update
      } else {
        await createUser(values);
        navigate('/userlists');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-lg w-full bg-black text-black text-xl p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-200 mb-6">User Form</h2>
        <Formik
          initialValues={{
            name: '',
            email: '',
            address: '',
            phoneNumber: '',
            dateOfBirth: '',
            gender: '',
            nationality: '',
            occupation: '',
            interests: '',
            profilePicture: '',
            additionalNotes: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          innerRef={formikRef}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-gray-300 font-semibold mb-2">Name:</label>
                <Field id="name" name="name" type="text" className="w-full border border-black-600 rounded-md px-3 py-2 focus:outline-none focus:border-blue-900" />
                <ErrorMessage name="name" component="p" className="text-red-500 mt-1" />
              </div>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-300 font-semibold mb-2">Email:</label>
                <Field id="email" name="email" type="email" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
                <ErrorMessage name="email" component="p" className="text-red-500 mt-1" />
              </div>
              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-gray-300 font-semibold mb-2">Address:</label>
                <Field id="address" name="address" type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
                <ErrorMessage name="address" component="p" className="text-red-500 mt-1" />
              </div>
              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-gray-300 font-semibold mb-2">Phone Number:</label>
                <Field id="phoneNumber" name="phoneNumber" type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
                <ErrorMessage name="phoneNumber" component="p" className="text-red-500 mt-1" />
              </div>
              {/* Date of Birth */}
              <div>
                <label htmlFor="dateOfBirth" className="block text-gray-300 font-semibold mb-2">Date of Birth:</label>
                <Field id="dateOfBirth" name="dateOfBirth" type="date" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
                <ErrorMessage name="dateOfBirth" component="p" className="text-red-500 mt-1" />
              </div>
              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block text-gray-300 font-semibold mb-2">Gender:</label>
                <Field id="gender" name="gender" as="select" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage name="gender" component="p" className="text-red-500 mt-1" />
              </div>
              {/* Nationality */}
              <div>
                <label htmlFor="nationality" className="block text-gray-300 font-semibold mb-2">Nationality:</label>
                <Field id="nationality" name="nationality" type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
                <ErrorMessage name="nationality" component="p" className="text-red-500 mt-1" />
              </div>
              {/* Occupation */}
              <div>
                <label htmlFor="occupation" className="block text-gray-300 font-semibold mb-2">Occupation:</label>
                <Field id="occupation" name="occupation" type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
                <ErrorMessage name="occupation" component="p" className="text-red-500 mt-1" />
              </div>
              {/* Interests */}
              <div>
                <label htmlFor="interests" className="block text-gray-300 font-semibold mb-2">Interests:</label>
                <Field id="interests" name="interests" type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
                <ErrorMessage name="interests" component="p" className="text-red-500 mt-1" />
              </div>
              {/* Profile Picture */}
              <div>
                <label htmlFor="profilePicture" className="block text-gray-300 font-semibold mb-2">Profile Picture:</label>
                <input id="profilePicture" name="profilePicture" type="file" onChange={(event) => setFieldValue("profilePicture", event.currentTarget.files[0])} className="w-full border text-green-500 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
                <ErrorMessage name="profilePicture" component="p" className="text-red-500 mt-1" />
              </div>
              {/* Additional Notes */}
              <div>
                <label htmlFor="additionalNotes" className="block text-gray-300 font-semibold mb-2">Additional Notes:</label>
                <Field id="additionalNotes" name="additionalNotes" as="textarea" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
                <ErrorMessage name="additionalNotes" component="p" className="text-red-500 mt-1" />
              </div>
              {/* Submit Button */}
              <div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200 transition duration-300">
                  {id ? 'Update' : 'Submit'} {/* Change button text based on whether id exists */}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserForm;
