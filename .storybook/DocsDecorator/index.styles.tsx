import { css, Theme } from '@emotion/react';

const styles = {
  componentHealthContainer: (theme: Theme) =>
    css({ margin: `${theme.spacings.FULL}rem 0` }),

  titleContainer: (theme: Theme) =>
    css({
      display: 'flex',
      flexWrap: 'wrap',
      backgroundColor: theme.palette.GREY_2,
      padding: `1.25rem ${theme.spacings.DOUBLE}rem`,
    }),

  titleIcon: (theme: Theme) =>
    css({
      width: '1.5rem',
      height: '1.5rem',
      marginRight: `${theme.spacings.HALF}rem`,
      display: 'block',
    }),

  warningIcon: (theme: Theme) =>
    css({
      color: theme.palette.SHADOW,
    }),

  recommendIcon: (theme: Theme) => css({ color: '#0A7B0A' }),

  documentationList: (theme: Theme) =>
    css({
      listStyle: 'none',
      margin: 0,
      padding: `1.25rem ${theme.spacings.DOUBLE}rem`,
    }),
};

export default styles;
