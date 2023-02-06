import type { NextPage } from 'next';
import { useState } from 'react';

const Portal: NextPage = () => {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('first', first);
    formData.append('last', last);

    if (file) {
      formData.append('file', file);
    }
    const options = {
      method: 'POST',
      body: formData,
    };
    const response = await fetch('/api/portal', options);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='first'>First Name</label>
      <input
        onChange={(e) => setFirst(e.target.value)}
        type='text'
        id='first'
        name='first'
        required
      />

      <label htmlFor='last'>Last Name</label>
      <input
        onChange={(e) => setLast(e.target.value)}
        type='text'
        id='last'
        name='last'
        required
      />

      <input
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
          }
        }}
        type='file'
        id='file'
        name='file'
      />
      <button type='submit'>Submit</button>
    </form>
  );
};
export default Portal;
