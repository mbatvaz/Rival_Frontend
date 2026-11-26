import { parseArgs } from 'node:util';

export function previewOptions(args = process.argv.slice(2), env = process.env) {
  const { values } = parseArgs({ args, options: { host: { type: 'string' }, port: { type: 'string' } } });
  const value = values.port ?? env.PORT ?? '4173';
  if (!/^\d+$/.test(value) || Number(value) > 65535) throw new Error('Preview port must be an integer between 0 and 65535.');
  const host = values.host ?? env.HOST ?? '0.0.0.0';
  if (!host.trim()) throw new Error('Preview host must not be empty.');
  return { host, port: Number(value) };
}
