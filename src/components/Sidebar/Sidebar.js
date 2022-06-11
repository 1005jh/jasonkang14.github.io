// @flow strict
import React from 'react';
import Author from './Author';
import Contacts from './Contacts';
import Copyright from './Copyright';
import Menu from './Menu';
import styles from './Sidebar.module.scss';
import { useSiteMetadata, useTagsList } from '../../hooks';
import Tags from '../Post/Tags';

type Props = {
  isIndex?: boolean
};

const Sidebar = ({ isIndex }: Props) => {
  const { author, copyright, menu } = useSiteMetadata();
  const tags = useTagsList();

  const formatURL = (url) => {
    const regex = /[a-z][A-Z]|\s[A-Z]/;
    const index = url.search(regex);
    if (index === -1) {
      return url.toLowerCase();
    }

    const newText = `${url.slice(0, index + 1)}-${url.slice(index + 1, url.length)}`.toLowerCase().replaceAll(/\s/g, '');
    return newText;
  };

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__inner']}>
        <Author author={author} isIndex={isIndex} />
        <Menu menu={menu} />
        <Contacts contacts={author.contacts} />
        <Tags
          tags={tags.map((tag) => `${tag.fieldValue} ${tag.totalCount}`)}
          tagSlugs={tags.map((tag) => `/tag/${formatURL(tag.fieldValue)}`)}
          inSidebar
        />
        <Copyright copyright={copyright} />
      </div>
    </div>
  );
};

export default Sidebar;