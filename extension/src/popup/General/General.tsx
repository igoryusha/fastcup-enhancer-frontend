import React, { FC } from 'react';

import { Text } from '@shared/ui/Text';
import { Link } from '@shared/ui/Link';

import { Section } from '@popup/components/Section';

import { GeneralProps } from './General.types';

export const General: FC<GeneralProps> = (props) => {
  const { className } = props;

  return (
    <Section.Group className={className}>
      <Section title="General">
        <Section.Item
          as="text"
          title={
            <>
              This extension is beeing developed by an independent development
              team of 1 person 😀.
              <br />
              <br />
              If you need more functionality, or you want something to be better
              contact me by{' '}
              <Text as="span" weight="bold">
                <Link href="mailto:ithater.iwnl@gmail.com" color="primary">
                  email
                </Link>
              </Text>{' '}
              or{' '}
              <Text as="span" weight="bold">
                <Link href="https://t.me/igoryusha22">Telegram</Link>
              </Text>
              .
            </>
          }
        />
      </Section>
    </Section.Group>
  );
};
