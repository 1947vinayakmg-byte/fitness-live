declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
declare module "*.glb";
declare module "*.glb?url" {
  const src: string;
  export default src;
}