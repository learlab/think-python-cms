/*
 *
 * HomePage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

const HomePage = () => {
  return (
    <div>
      <h1>Content Generator&apos;s HomePage</h1>
      <p>Content generator includes a new auto-content field type. This field is intended to be used within a component that contains another field called "Text". To generate content, simply press "Generate", and the "Text" field will be used to populate the auto-content field.</p>
      <p>Currently, question generation is supported for "Chunk" components. In the future, we will support keyphrase generation. We will also extend the plugin to support content generation using embedded videos. This will extract transcripts from videos, add them to a "Text" field, and allow Content Generator to work its magic.</p>
      <p>After generating content, you should review it to make sure it meets your standards. Automatically generated content can be edited and saved like any other field.</p>
    </div>
  );
};

export default HomePage;
