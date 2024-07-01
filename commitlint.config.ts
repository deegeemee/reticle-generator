import { RuleConfigSeverity } from '@commitlint/types';

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'chore', 'style', 'refactor', 'ci', 'test', 'revert', 'perf', 'release'],
    ],
    'body-max-line-length': [RuleConfigSeverity.Error, 'always', 512] as const,
  },
};
