'use strict';

module.exports = {
  site: {
    siteMetadata: {
      url: 'http://localhost',
      title: 'Test title',
      subtitle: 'Test subtitle',
      copyright: 'Test copyright',
      disqusShortname: '',
      postsPerPage: 4,
      menu: [
        {
          label: 'Test label 1',
          path: '/test/1/'
        },
        {
          label: 'Test label 2',
          path: '/test/2/'
        },
        {
          label: 'Test label 3',
          path: '/test/3/'
        }
      ],
      author: {
        name: 'Jason Kang',
        photo: '/test.jpg',
        bio: 'I believe software engineers can change the world',
        contacts: {
          email: '#',
          telegram: '#',
          twitter: '#',
          github: 'jasonkang14',
          rss: '#',
          vkontakte: '#',
          instagram: 'jkang14',
        }
      }
    }
  }
};
