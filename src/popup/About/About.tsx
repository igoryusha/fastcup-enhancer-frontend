import React, { FC } from 'react';

import manifest from '@/manifest.json';

import { TELEGRAM_LINK } from '@shared/constants/TELEGRAM_LINK';
import { DEVELOPER_PROMO_LINK } from '@shared/constants/PROMO_LINK';
import { GITHUB_PROJECT_LINK } from '@shared/constants/GITHUB_PROJECT_LINK';

import { Section } from '@popup/components/Section';

import { AboutProps } from './About.types';
import { i18n } from '@shared/utils/i18n';

export const About: FC<AboutProps> = (props) => {
  const { className } = props;

  return (
    <Section.Group className={className}>
      <Section title={i18n('about_tab_title')}>
        <Section.Item
          as="text"
          title={i18n('about_tab_version')}
          description={manifest.version}
        />

        <Section.Item
          as="link"
          href={GITHUB_PROJECT_LINK}
          title={i18n('about_tab_source_code')}
          description="GitHub"
        />

        {/*
          add after release
          <Section.Item as="link" title="Website" description="" /> */}
      </Section>

      <Section title={i18n('about_tab_team')}>
        <Section.Item
          as="link"
          href={DEVELOPER_PROMO_LINK}
          title={i18n('igor_nerusin')}
          description={i18n('about_tab_website')}
        />

        <Section.Item
          as="link"
          href={TELEGRAM_LINK}
          title={i18n('igor_nerusin')}
          description={i18n('telegram')}
        />
      </Section>
    </Section.Group>
  );
};
