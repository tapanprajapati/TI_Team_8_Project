/**
 * @author Parth Parmar <parth.parmar@default.ca>
 *
 */
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface NavItemModel {
  name: string;
  routeLink: string;
  isAuthenticationRequired?: boolean;
  isIcon?: boolean;
  iconName?: IconDefinition | string;
}
