import { PetAccessory } from "../types";

export const PET_ACCESSORIES: PetAccessory[] = [
  // Домики
  { id: "acc1", key: "house_kennel", title: "Будка", emoji: "🏠", slot: "house", cost: 20 },
  { id: "acc2", key: "house_castle", title: "Замок", emoji: "🏰", slot: "house", cost: 50 },
  { id: "acc3", key: "house_tent", title: "Палатка", emoji: "⛺", slot: "house", cost: 25 },
  { id: "acc4", key: "house_igloo", title: "Иглу", emoji: "🧊", slot: "house", cost: 35 },
  { id: "acc5", key: "house_nest", title: "Гнёздышко", emoji: "🪹", slot: "house", cost: 15 },

  // Игрушки
  { id: "acc6", key: "toy_ball", title: "Мячик", emoji: "🎾", slot: "toy", cost: 10 },
  { id: "acc7", key: "toy_bone", title: "Косточка", emoji: "🦴", slot: "toy", cost: 10 },
  { id: "acc8", key: "toy_mouse", title: "Мышка", emoji: "🐭", slot: "toy", cost: 15 },
  { id: "acc9", key: "toy_frisbee", title: "Фрисби", emoji: "🥏", slot: "toy", cost: 20 },
  { id: "acc10", key: "toy_teddy", title: "Мишка", emoji: "🧸", slot: "toy", cost: 25 },

  // Фоны
  { id: "acc11", key: "bg_space", title: "Космос", emoji: "🌌", slot: "background", cost: 35 },
  { id: "acc12", key: "bg_forest", title: "Лес", emoji: "🌲", slot: "background", cost: 25 },
  { id: "acc13", key: "bg_beach", title: "Пляж", emoji: "🏖️", slot: "background", cost: 30 },
  { id: "acc14", key: "bg_castle", title: "Замок", emoji: "🏰", slot: "background", cost: 50 },
  { id: "acc15", key: "bg_rainbow", title: "Радуга", emoji: "🌈", slot: "background", cost: 20 },

  // Миски
  { id: "acc16", key: "bowl_basic", title: "Миска", emoji: "🍽️", slot: "bowl", cost: 10 },
  { id: "acc17", key: "bowl_golden", title: "Золотая миска", emoji: "🥇", slot: "bowl", cost: 40 },
  { id: "acc18", key: "bowl_fountain", title: "Фонтанчик", emoji: "⛲", slot: "bowl", cost: 30 },

  // Лежанки
  { id: "acc19", key: "bed_pillow", title: "Подушка", emoji: "🛏️", slot: "bed", cost: 15 },
  { id: "acc20", key: "bed_hammock", title: "Гамак", emoji: "🪑", slot: "bed", cost: 25 },
  { id: "acc21", key: "bed_basket", title: "Корзинка", emoji: "🧺", slot: "bed", cost: 20 },
];
