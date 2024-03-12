import React, { FC } from 'react';

import manifest from '@public/manifest.json';

import { Section } from '@popup/components/Section';

import { AboutProps } from './About.types';

export const About: FC<AboutProps> = (props) => {
  const { className } = props;

  return (
    <Section.Group className={className}>
      <Section title="About">
        <Section.Item
          as="text"
          title="Version"
          description={manifest.version}
        />

        <Section.Item
          as="link"
          href="https://github.com/igoryusha22/fastcup-enhancer"
          title="Source code"
          description="GitHub"
        />

        {/*
          add after release
          <Section.Item as="link" title="Website" description="" /> */}
      </Section>

      <Section title="Team">
        <Section.Item
          as="link"
          href="https://nerusin.dev"
          title="Igor Nerusin"
          description={'Website'}
        />

        <Section.Item
          as="link"
          href="https://t.me/igoryusha22"
          title="Igor Nerusin"
          description={'Telegram'}
        />
      </Section>
    </Section.Group>
  );
};
