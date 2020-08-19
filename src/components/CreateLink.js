import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LINKS_PER_PAGE } from '../utils/Constants';
import { CREATE_LINK_MUTATION, FEED_QUERY } from '../utils/Queries';

function CreateLink() {
  const history = useHistory();
  const [url, setURL] = useState('');
  const [description, setDescription] = useState('');

  const [post] = useMutation(CREATE_LINK_MUTATION, {
    onCompleted: () => {
      history.push('/new/1');
    },
    update(store, { data: { post: p } }) {
      const variables = {
        first: 6,
        skip: 0,
        orderBy: 'createdAt_DESC'
      };

      const data = store.readQuery({
        query: FEED_QUERY,
        variables
      });

      // const newData = {
      //   ...data,
      //   feed: {
      //     ...data.feed,
      //     count: data.feed.count + 1,
      //     links: [p, ...data.feed.links.slice(0, data.feed.links.length - 1)]
      //   }
      // };

      data.feed.list.unshift(p);

      console.log({ store, data });

      store.writeQuery({
        query: FEED_QUERY,
        data,
        variables
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
