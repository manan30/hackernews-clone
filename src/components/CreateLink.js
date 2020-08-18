import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

const CREATE_LINK_MUTATION = gql`
  mutation createLink($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      description
      url
    }
  }
`;

function CreateLink() {
  const [url, setURL] = useState('');
  const [description, setDescription] = useState('');

  const [post, data] = useMutation(CREATE_LINK_MUTATION);

  const handleSubmit = (e) => {
    e.preventDefault();
    post({ variables: { description, url } });
    setURL('');
    setDescription('');
  };

  return (
    <form>
      <div>
        <label htmlFor="url">
          URL
          <input
            id="url"
            value={url}
            onChange={(e) => setURL(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="desc">
          Description
          <input
            id="desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

CreateLink.propTypes = {};

export default CreateLink;
