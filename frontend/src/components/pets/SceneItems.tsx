// PNG-иллюстрации предметов для сцены питомца (сгенерированы DALL-E)
// Каждый предмет — PNG с прозрачным фоном в стиле Pixar

const ITEM_IMAGES: Record<string, string> = {
  house_kennel: "/items/house_kennel.png",
  house_castle: "/items/house_castle.png",
  house_tent: "/items/house_tent.png",
  house_igloo: "/items/house_igloo.png",
  house_nest: "/items/house_nest.png",
  toy_ball: "/items/toy_ball.png",
  toy_bone: "/items/toy_bone.png",
  toy_mouse: "/items/toy_mouse.png",
  toy_frisbee: "/items/toy_frisbee.png",
  toy_teddy: "/items/toy_teddy.png",
  bowl_basic: "/items/bowl_basic.png",
  bowl_golden: "/items/bowl_golden.png",
  bowl_fountain: "/items/bowl_fountain.png",
  bed_pillow: "/items/bed_pillow.png",
  bed_hammock: "/items/bed_hammock.png",
  bed_basket: "/items/bed_basket.png",
};

function ItemImage({ id, className }: { id: string; className?: string }) {
  const src = ITEM_IMAGES[id];
  if (!src) return null;
  return <img src={src} alt={id} className={className} draggable={false} />;
}

// Обёртки для совместимости с PetScene
export function HouseItem({ id }: { id: string }) {
  return <ItemImage id={id} className="ps-img-house" />;
}

export function GroundItem({ id }: { id: string }) {
  const isSmall = id.startsWith("toy_ball") || id.startsWith("toy_frisbee") || id.startsWith("bowl_basic") || id.startsWith("bowl_golden");
  return <ItemImage id={id} className={isSmall ? "ps-img-ground-sm" : "ps-img-ground"} />;
}

export { ITEM_IMAGES };
