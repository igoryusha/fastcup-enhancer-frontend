import React, { FC } from 'react';

import { i18n } from '@shared/utils/i18n';

import { Text } from '@shared/ui/Text';
import { Link } from '@shared/ui/Link';

import { Section } from '@popup/components/Section';

import { GeneralProps } from './General.types';
import { TELEGRAM_LINK } from '@shared/constants/TELEGRAM_LINK';

export const General: FC<GeneralProps> = (props) => {
  const { className } = props;

  return (
    <Section.Group className={className}>
      <Section title={i18n('general_tab_title')}>
        <Section.Item
          as="text"
          title={
            <>
              {i18n('general_tab_about_team')}
              <br />
              <br />
              {i18n('general_tab_if_you_need_more_1')}{' '}
              <Text as="span" weight="bold">
                <Link href="mailto:ithater.iwnl@gmail.com" color="primary">
                  {i18n('general_tab_if_you_need_more_2')}
                </Link>
              </Text>{' '}
              {i18n('general_tab_if_you_need_more_3')}{' '}
              <Text as="span" weight="bold">
                <Link href={TELEGRAM_LINK}>{i18n('telegram')}</Link>
              </Text>
              .
            </>
          }
        />
      </Section>
    </Section.Group>
  );
};
