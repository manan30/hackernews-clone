import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { CREATE_LINK_MUTATION, FEED_QUERY } from '../utils/Queries';

function CreateLink() {
  const [url, setURL] = useState('');
  const [description, setDescription] = useState('');

  const [post] = useMutation(CREATE_LINK_MUTATION, {
    update(store, { data: { post: p } }) {
      const data = store.readQuery({ query: FEED_QUERY });
      data.feed.links.unshift(p);
      store.writeQuery({
        query: FEED_QUERY,
        data
      });
    }
  });

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
