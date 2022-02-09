export interface ILeague {
  id: string;
  name: string;
  slug: string;
  abbr: string;
  logos: {
    light: string;
    dark: string;
  };
}
