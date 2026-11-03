import team from '@/assets/crisp-laboratory-team.jpg';
import sample from '@/assets/crisp-laboratory-sample.jpg';
import pipette from '@/assets/crisp-laboratory-pipette.jpg';
import workbench from '@/assets/crisp-laboratory-workbench.jpg';
import analysis from '@/assets/supplied-laboratory-analysis.jpg.asset.json';
import vial from '@/assets/supplied-laboratory-vial.jpg.asset.json';
import packaging from '@/assets/supplied-white-peptide-packaging.jpg.asset.json';

// Absolute asset URLs keep uploaded photos reachable on external hosts too.
const hostedAsset = (url: string) => `https://hearth-and-herb-apothecary.lovable.app${url}`;
export const homepageImages = {
  team, sample, pipette, workbench,
  analysis: hostedAsset(analysis.url),
  vial: hostedAsset(vial.url),
  packaging: hostedAsset(packaging.url),
};