/// <mls fileReference="_102043_/l2/cafeFlow/module.ts" enhancement="_blank" />
import type { AuraModuleFrontendDefinition, IPaths, ISkill, IGenomeConfig } from '/_102029_/l2/contracts/bootstrap.js';

export const moduleGenome: Record<string, IGenomeConfig> = {
  'web/desktop/page11': {
    designSystem: 'default',
    device: 'desktop',
    layout: 'standard',
  }
} as const;

export const shared: IPaths = {
  web: {
    sharedPath: '/_102043_/l2/cafeFlow/web/shared',
    sharedSkill: '/_102020_/l2/agentMaterializeSolution/skills/genPageShared.ts'
  }
}

export const skills: ISkill = {
  definition:{
    skillPath:  ['_102034_'],
  },
  architecture: {
    skillPath:  ['_102021_/l2/skills/architecture.md'],
  },
  layer1: {
    skillPath:  ['_102021_/l2/skills/layer_1.md'],
  },
  layer2: {
    skillPath:  ['_102021_/l2/skills/layer_2.md'],
  },
  layer3: {
    skillPath:  ['_102021_/l2/skills/layer_3.md'],
  },
  layer4: {
    skillPath:  ['_102021_/l2/skills/layer_4.md'],
  },
  contract: {
    skillPath: ["_102020_/l2/agentMaterializeSolution/skills/genContract.ts"],
  }
}

export const moduleStates = {} as const;

export const moduleShellPreferences = {
  layout: {
    asideMode: { desktop: 'inline', mobile: 'fullscreen' },
  },
} as const;

export const moduleFrontendDefinition: AuraModuleFrontendDefinition = {
  pageTitle: 'cafeFlow',
  device: 'desktop',
  navigation: [
  ],
  routes: [
  ],
};
