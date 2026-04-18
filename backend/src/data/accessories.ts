import { PetAccessory } from "../types";

export const PET_ACCESSORIES: PetAccessory[] = [
  // Шляпы
  { id: "acc1", key: "hat_crown", title: "Корона", emoji: "👑", slot: "hat", cost: 30 },
  { id: "acc2", key: "hat_cap", title: "Кепка", emoji: "🧢", slot: "hat", cost: 15 },
  { id: "acc3", key: "hat_wizard", title: "Колпак волшебника", emoji: "🎩", slot: "hat", cost: 40 },
  { id: "acc4", key: "hat_flower", title: "Цветочек", emoji: "🌸", slot: "hat", cost: 10 },
  { id: "acc5", key: "hat_party", title: "Праздничный колпак", emoji: "🎉", slot: "hat", cost: 20 },

  // Очки
  { id: "acc6", key: "glasses_sun", title: "Солнечные очки", emoji: "🕶️", slot: "glasses", cost: 20 },
  { id: "acc7", key: "glasses_nerd", title: "Умные очки", emoji: "🤓", slot: "glasses", cost: 15 },
  { id: "acc8", key: "glasses_star", title: "Звёздные очки", emoji: "⭐", slot: "glasses", cost: 25 },

  // Фоны
  { id: "acc9", key: "bg_space", title: "Космос", emoji: "🌌", slot: "background", cost: 35 },
  { id: "acc10", key: "bg_forest", title: "Лес", emoji: "🌲", slot: "background", cost: 25 },
  { id: "acc11", key: "bg_beach", title: "Пляж", emoji: "🏖️", slot: "background", cost: 30 },
  { id: "acc12", key: "bg_castle", title: "Замок", emoji: "🏰", slot: "background", cost: 50 },
  { id: "acc13", key: "bg_rainbow", title: "Радуга", emoji: "🌈", slot: "background", cost: 20 },

  // Ошейники
  { id: "acc14", key: "collar_bow", title: "Бантик", emoji: "🎀", slot: "collar", cost: 10 },
  { id: "acc15", key: "collar_bell", title: "Колокольчик", emoji: "🔔", slot: "collar", cost: 15 },
  { id: "acc16", key: "collar_star", title: "Звёздный ошейник", emoji: "✨", slot: "collar", cost: 25 },

  // Крылья
  { id: "acc17", key: "wings_angel", title: "Ангельские крылья", emoji: "😇", slot: "wings", cost: 60 },
  { id: "acc18", key: "wings_dragon", title: "Крылья дракона", emoji: "🐉", slot: "wings", cost: 80 },
  { id: "acc19", key: "wings_butterfly", title: "Крылья бабочки", emoji: "🦋", slot: "wings", cost: 40 },
];
