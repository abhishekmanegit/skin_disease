
import { SkinCondition } from "@/types/skin";

export const skinConditions: SkinCondition[] = [
  {
    id: "actinic-keratoses",
    name: "Actinic Keratoses and Intraepithelial Carcinoma",
    description: "Actinic keratoses are pre-cancerous lesions that appear on sun-damaged skin. Intraepithelial carcinoma (Bowen's disease) is an early form of skin cancer that appears as a persistent, non-elevated red, scaly or crusted plaque.",
    symptoms: [
      "Rough, scaly patches on skin",
      "Dry, discolored areas",
      "Sometimes itchy or painful to touch",
      "Often appears on face, lips, ears, hands, forearms, and neck"
    ],
    treatment: "Treatment options include cryotherapy (freezing), topical medications (such as 5-fluorouracil, imiquimod, or ingenol mebutate), photodynamic therapy, curettage, or laser therapy. Regular follow-ups with a dermatologist are recommended.",
    risk: "Moderate",
    needsMedicalAttention: true
  },
  {
    id: "basal-cell-carcinoma",
    name: "Basal Cell Carcinoma",
    description: "Basal cell carcinoma is the most common type of skin cancer. It typically appears as a pearly or waxy bump, or a flat, flesh-colored or brown scar-like lesion.",
    symptoms: [
      "Pearly or waxy bump",
      "Flat, flesh-colored or brown scar-like lesion",
      "Sore that bleeds, scabs, heals and then returns",
      "Most commonly found on sun-exposed areas"
    ],
    treatment: "Treatment options include surgical excision, Mohs surgery, radiation therapy, cryotherapy, photodynamic therapy, topical medications, or laser surgery. Early treatment is important to prevent growth and damage to surrounding tissues.",
    risk: "Moderate",
    needsMedicalAttention: true
  },
  {
    id: "benign-keratosis",
    name: "Benign Keratosis-like Lesions",
    description: "Benign keratosis-like lesions, including seborrheic keratoses, are non-cancerous growths on the skin. They may look worrisome but are harmless.",
    symptoms: [
      "Waxy, stuck-on appearance",
      "Varying color from light tan to black",
      "Round or oval shaped growths",
      "Can appear anywhere on the body except palms and soles"
    ],
    treatment: "These lesions are benign and typically don't require treatment unless they become irritated or you want them removed for cosmetic reasons. Treatment options include cryotherapy, electrosurgery, curettage, or laser therapy.",
    risk: "Low",
    needsMedicalAttention: false
  },
  {
    id: "dermatofibroma",
    name: "Dermatofibroma",
    description: "Dermatofibroma is a common benign skin tumor that usually appears as a small, firm bump. They're most commonly found on the legs but can occur anywhere on the body.",
    symptoms: [
      "Small, firm, rounded bump",
      "Usually brown, reddish-brown, or skin-colored",
      "May be tender or itchy",
      "Often dimples when pinched"
    ],
    treatment: "Since these lesions are benign, they don't typically require treatment. If a dermatofibroma is bothersome or for cosmetic reasons, it can be surgically removed, though they may recur after removal.",
    risk: "Low",
    needsMedicalAttention: false
  },
  {
    id: "melanoma",
    name: "Melanoma",
    description: "Melanoma is the most serious type of skin cancer. It develops in the cells that produce melanin, the pigment that gives skin its color. Melanoma can spread to other parts of the body if not caught early.",
    symptoms: [
      "Asymmetrical mole or lesion",
      "Border irregularity",
      "Color variations within the same lesion",
      "Diameter larger than 6mm (pencil eraser)",
      "Evolving size, shape, color, or elevation"
    ],
    treatment: "Treatment depends on the stage of melanoma but typically includes surgical removal of the melanoma and potentially some surrounding tissue. Advanced cases may require lymph node biopsy, immunotherapy, targeted therapy, chemotherapy, radiation therapy, or clinical trials.",
    risk: "High",
    needsMedicalAttention: true
  },
  {
    id: "melanocytic-nevi",
    name: "Melanocytic Nevi",
    description: "Melanocytic nevi, commonly known as moles, are growths on the skin that are usually brown or black. They can appear anywhere on the body, alone or in groups.",
    symptoms: [
      "Round or oval shape",
      "Flat or raised appearance",
      "Smooth surface",
      "Generally uniform color",
      "Usually less than 6mm in diameter"
    ],
    treatment: "Most melanocytic nevi are benign and don't require treatment. However, if a mole changes in appearance or becomes concerning, it should be checked by a dermatologist. Removal may be recommended for suspicious moles, which will then be examined under a microscope to check for cancer cells.",
    risk: "Low",
    needsMedicalAttention: false
  },
  {
    id: "vascular-lesions",
    name: "Vascular Lesions",
    description: "Vascular lesions are relatively common abnormalities of the skin and underlying tissues, involving blood vessels. They include hemangiomas, vascular malformations, and pyogenic granulomas.",
    symptoms: [
      "Red, purple, or blue coloration",
      "Raised or flat appearance",
      "Can occur anywhere on the body",
      "May be present at birth or develop later"
    ],
    treatment: "Treatment varies depending on the type, size, and location of the lesion. Options include observation (for lesions that may resolve on their own), laser therapy, sclerotherapy, surgical excision, or medications such as beta-blockers for certain hemangiomas.",
    risk: "Low",
    needsMedicalAttention: false
  }
];

export const getDiseaseById = (id: string): SkinCondition | undefined => {
  return skinConditions.find(condition => condition.id === id);
};
