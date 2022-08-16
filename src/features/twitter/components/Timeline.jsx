import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

function Timeline() {
  return (
    <TwitterTimelineEmbed
      sourceType="profile"
      screenName="f1"
      options={{ height: '30rem', width: '20rem' }}
    />
  );
}

export default Timeline;
