import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

function Timeline() {
  return (
    <div className='absolute right-4 mt-8 hidden xl:block'>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="f1"
        options={{ height: '600px', width: '350px' }}
      />
    </div>
  );
}

export default Timeline;
