// utils/exerciseSubstitutions.ts

// Types of equipment limitations or modifications
export type SubstitutionReason = 
  | 'no_equipment'
  | 'home_gym'
  | 'injury'
  | 'mobility'
  | 'alternative';

// Exercise substitute with detailed information
export interface ExerciseSubstitute {
  name: string;
  equipmentNeeded: string;
  reasonForSubstitution: SubstitutionReason[];
  instructionsForUse: string;
  videoId?: string; // YouTube video ID if available
}

// Exercise substitution object
export interface ExerciseSubstitution {
  originalExercise: string;
  substitutes: ExerciseSubstitute[];
}

// Comprehensive exercise substitution database
const exerciseSubstitutions: ExerciseSubstitution[] = [
  {
    originalExercise: 'BARBELL BENCH PRESS',
    substitutes: [
      {
        name: 'DUMBBELL BENCH PRESS',
        equipmentNeeded: 'Dumbbells, Bench',
        reasonForSubstitution: ['home_gym', 'injury', 'alternative'],
        instructionsForUse: 'Use if barbell causes shoulder pain. Greater range of motion.',
        videoId: 'QsYre__-aro'
      },
      {
        name: 'FLOOR PRESS',
        equipmentNeeded: 'Barbell or Dumbbells',
        reasonForSubstitution: ['no_equipment', 'home_gym', 'mobility'],
        instructionsForUse: 'Use if no bench is available. Limits range of motion which may help certain injuries.',
        videoId: 'HgpZIhQQTH8'
      },
      {
        name: 'PUSH-UPS',
        equipmentNeeded: 'None (Weighted vest optional)',
        reasonForSubstitution: ['no_equipment', 'home_gym'],
        instructionsForUse: 'Use as baseline substitute with no equipment. Add weight vest or elevate feet for progression.',
        videoId: 'IODxDxX7oi4'
      }
    ]
  },
  {
    originalExercise: 'INCLINE BENCH PRESS',
    substitutes: [
      {
        name: 'INCLINE DUMBBELL PRESS',
        equipmentNeeded: 'Dumbbells, Incline Bench',
        reasonForSubstitution: ['home_gym', 'injury', 'alternative'],
        instructionsForUse: 'Better range of motion and often more shoulder-friendly than barbell version.',
        videoId: 'QsYre__-aro'
      },
      {
        name: 'LANDMINE PRESS',
        equipmentNeeded: 'Barbell, Landmine Attachment (or corner)',
        reasonForSubstitution: ['home_gym', 'injury', 'alternative'],
        instructionsForUse: 'More shoulder-friendly angle with similar upper chest emphasis.',
        videoId: 'Uu-aJ-fO8Hk' 
      },
      {
        name: 'PIKE PUSH-UPS',
        equipmentNeeded: 'None',
        reasonForSubstitution: ['no_equipment', 'home_gym'],
        instructionsForUse: 'Elevate feet to increase shoulder emphasis. Progress to handstand push-ups.',
        videoId: 'x7_I5SUAd00'
      }
    ]
  },
  {
    originalExercise: 'BARBELL PIN PRESS',
    substitutes: [
      {
        name: 'PAUSED FLOOR PRESS',
        equipmentNeeded: 'Barbell or Dumbbells',
        reasonForSubstitution: ['no_equipment', 'home_gym'],
        instructionsForUse: 'Pause with triceps on floor for 2-3 seconds to simulate pin press.',
        videoId: 'HgpZIhQQTH8'
      },
      {
        name: 'DEAD STOP PUSH-UPS',
        equipmentNeeded: 'None',
        reasonForSubstitution: ['no_equipment', 'home_gym'],
        instructionsForUse: 'Lower chest to floor, release tension completely, then push back up.',
        videoId: 'IODxDxX7oi4'
      }
    ]
  },
  {
    originalExercise: 'BARBELL FLOOR SKULL CRUSHER',
    substitutes: [
      {
        name: 'DUMBBELL FLOOR SKULL CRUSHER',
        equipmentNeeded: 'Dumbbells',
        reasonForSubstitution: ['home_gym', 'alternative'],
        instructionsForUse: 'Use dumbbells instead of barbell, same movement pattern.',
        videoId: 'hLdl-MGzQzc'
      },
      {
        name: 'DIAMOND PUSH-UPS',
        equipmentNeeded: 'None',
        reasonForSubstitution: ['no_equipment', 'home_gym'],
        instructionsForUse: 'Form diamond shape with hands under chest. Effective triceps activation.',
        videoId: 'J0DnG1_S92I'
      },
      {
        name: 'OVERHEAD TRICEPS EXTENSION',
        equipmentNeeded: 'Dumbbells or resistance band',
        reasonForSubstitution: ['home_gym', 'alternative'],
        instructionsForUse: 'Effective triceps isolation that can be done seated or standing.',
        videoId: 'YbX7Wd8jQ-Q'
      }
    ]
  },
  {
    originalExercise: 'PULL-UP',
    substitutes: [
      {
        name: 'LAT PULLDOWN',
        equipmentNeeded: 'Cable machine with lat pulldown attachment',
        reasonForSubstitution: ['mobility', 'injury', 'alternative'],
        instructionsForUse: 'Direct substitute if unable to perform pull-ups.',
        videoId: 'lVhrjZ_cemo'
      },
      {
        name: 'BAND-ASSISTED PULL-UPS',
        equipmentNeeded: 'Pull-up bar, Resistance bands',
        reasonForSubstitution: ['home_gym', 'mobility'],
        instructionsForUse: 'Use bands to reduce bodyweight resistance. Progressive overload by using lighter bands.',
        videoId: '7yrS1MtDiwI'
      },
      {
        name: 'BODYWEIGHT ROWS (INVERTED ROWS)',
        equipmentNeeded: 'Table, Smith machine or low bar',
        reasonForSubstitution: ['no_equipment', 'home_gym', 'mobility'],
        instructionsForUse: 'Adjust angle of body to increase/decrease difficulty.',
        videoId: 'XZV9IwluPjw'
      }
    ]
  },
  {
    originalExercise: 'BARBELL ROW',
    substitutes: [
      {
        name: 'DUMBBELL ROW',
        equipmentNeeded: 'Dumbbells, bench (optional)',
        reasonForSubstitution: ['home_gym', 'alternative'],
        instructionsForUse: 'One-arm version allows greater range of motion and core engagement.',
        videoId: 'roCP6wCXPqo'
      },
      {
        name: 'BODYWEIGHT ROWS',
        equipmentNeeded: 'Table, Smith machine or low bar',
        reasonForSubstitution: ['no_equipment', 'home_gym'],
        instructionsForUse: 'Adjust feet position to increase/decrease difficulty.',
        videoId: 'XZV9IwluPjw'
      },
      {
        name: 'BAND-RESISTED ROWS',
        equipmentNeeded: 'Resistance bands',
        reasonForSubstitution: ['no_equipment', 'home_gym'],
        instructionsForUse: 'Anchor band to sturdy object at mid-chest height.',
        videoId: 'xaABcQYQOEU'
      }
    ]
  },
  {
    originalExercise: 'INVERTED ROW',
    substitutes: [
      {
        name: 'BENT-OVER DUMBBELL ROW',
        equipmentNeeded: 'Dumbbells',
        reasonForSubstitution: ['home_gym', 'alternative'],
        instructionsForUse: 'Use if no setup for inverted rows available.',
        videoId: 'roCP6wCXPqo'
      },
      {
        name: 'SEATED CABLE ROW',
        equipmentNeeded: 'Cable machine, row attachment',
        reasonForSubstitution: ['alternative'],
        instructionsForUse: 'Use close-grip attachment for similar muscle emphasis.',
        videoId: 'sP_4vybjVJs'
      },
      {
        name: 'BAND FACE PULL',
        equipmentNeeded: 'Resistance band',
        reasonForSubstitution: ['no_equipment', 'home_gym'],
        instructionsForUse: 'Anchor band at head height. Focus on rear delt and mid-trap contraction.',
        videoId: 'V5GS2_MJVsg'
      }
    ]
  },
  {
    originalExercise: 'BACK SQUAT',
    substitutes: [
      {
        name: 'GOBLET SQUAT',
        equipmentNeeded: 'Dumbbell or Kettlebell',
        reasonForSubstitution: ['home_gym', 'alternative', 'mobility'],
        instructionsForUse: 'Easier to maintain proper form, good for beginners or those with mobility issues.',
        videoId: 'MeIiLgq7isw'
      },
      {
        name: 'BULGARIAN SPLIT SQUAT',
        equipmentNeeded: 'Bench or chair, dumbbells optional',
        reasonForSubstitution: ['home_gym', 'alternative', 'injury'],
        instructionsForUse: 'Unilateral exercise that requires less weight for effective stimulus.',
        videoId: '2C-uNgKwPLE'
      },
      {
        name: 'BODYWEIGHT SQUAT',
        equipmentNeeded: 'None',
        reasonForSubstitution: ['no_equipment', 'home_gym'],
        instructionsForUse: 'Add tempo, pauses, or single-leg variations to increase difficulty.',
        videoId: 'YaXPRqUwItQ'
      }
    ]
  },
  {
    originalExercise: 'HAMMER CURL',
    substitutes: [
      {
        name: 'BAND HAMMER CURL',
        equipmentNeeded: 'Resistance band',
        reasonForSubstitution: ['no_equipment', 'home_gym'],
        instructionsForUse: 'Stand on band and curl with neutral grip. Increasing tension through range of motion.',
        videoId: 'pn-YAb1fJAk'
      },
      {
        name: 'CROSS-BODY HAMMER CURL',
        equipmentNeeded: 'Dumbbells',
        reasonForSubstitution: ['alternative'],
        instructionsForUse: 'Curl dumbbell across body for additional brachialis emphasis.',
        videoId: 'KC9cBQTVuZ0'
      },
      {
        name: 'TOWEL CHIN-UPS',
        equipmentNeeded: 'Pull-up bar, towels',
        reasonForSubstitution: ['home_gym', 'alternative'],
        instructionsForUse: 'Hang towels from bar and grip them for neutral grip pull-up variation.',
        videoId: 'lRTHsUYiTDw'
      }
    ]
  },
  {
    originalExercise: 'DEADLIFT',
    substitutes: [
      {
        name: 'ROMANIAN DEADLIFT',
        equipmentNeeded: 'Barbell or Dumbbells',
        reasonForSubstitution: ['alternative', 'injury'],
        instructionsForUse: 'Focus on hamstrings with less lower back stress. Keep soft knee bend throughout.',
        videoId: 'jEy_czb3RKA'
      },
      {
        name: 'TRAP BAR DEADLIFT',
        equipmentNeeded: 'Hex/Trap Bar',
        reasonForSubstitution: ['alternative', 'injury', 'mobility'],
        instructionsForUse: 'More knee-dominant with neutral grip. Easier on the lower back.',
        videoId: 'TU2xZ7C4BXU'
      },
      {
        name: 'KETTLEBELL SWING',
        equipmentNeeded: 'Kettlebell',
        reasonForSubstitution: ['home_gym', 'alternative'],
        instructionsForUse: 'Explosive hip hinge mimics deadlift pattern with less load.',
        videoId: 'YSxHifyI6s8'
      }
    ]
  },
  {
    originalExercise: 'MILITARY PRESS',
    substitutes: [
      {
        name: 'SEATED DUMBBELL PRESS',
        equipmentNeeded: 'Dumbbells, Bench with back support',
        reasonForSubstitution: ['home_gym', 'injury', 'alternative'],
        instructionsForUse: 'Reduces need for core stabilization. Can be easier on lower back.',
        videoId: 'qEwKCR5JCog'
      },
      {
        name: 'LANDMINE PRESS',
        equipmentNeeded: 'Barbell, landmine attachment (or corner)',
        reasonForSubstitution: ['injury', 'mobility', 'alternative'],
        instructionsForUse: 'Angled pressing pattern is often friendlier for those with shoulder issues.',
        videoId: 'Uu-aJ-fO8Hk'
      },
      {
        name: 'PIKE PUSH-UP',
        equipmentNeeded: 'None',
        reasonForSubstitution: ['no_equipment', 'home_gym'],
        instructionsForUse: 'More shoulder-focused push-up variation. Progress to handstand for increased difficulty.',
        videoId: 'x7_I5SUAd00'
      }
    ]
  }
];

/**
 * Get substitution options for a specific exercise with better partial matching
 * @param exerciseName Name of the original exercise (case-insensitive)
 * @returns Array of substitute options or null if none found
 */
export const getExerciseSubstitutions = (exerciseName: string) => {
  if (!exerciseName) return null;
  
  // Normalize the input name
  const normalizedName = exerciseName.toUpperCase();
  
  // First try exact match
  const exactMatch = exerciseSubstitutions.find(
    item => item.originalExercise === normalizedName
  );
  
  if (exactMatch) {
    return exactMatch.substitutes;
  }
  
  // If no exact match, try partial match
  for (const substitution of exerciseSubstitutions) {
    if (normalizedName.includes(substitution.originalExercise) || 
        substitution.originalExercise.includes(normalizedName)) {
      return substitution.substitutes;
    }
  }
  
  // Check major parts of exercise names (e.g., "BENCH", "SQUAT", etc.)
  const exerciseParts = ['BENCH', 'SQUAT', 'PRESS', 'ROW', 'DEADLIFT', 'CURL'];
  
  for (const part of exerciseParts) {
    if (normalizedName.includes(part)) {
      for (const substitution of exerciseSubstitutions) {
        if (substitution.originalExercise.includes(part)) {
          return substitution.substitutes;
        }
      }
    }
  }
  
  return null;
};

/**
 * Get substitutions filtered by available equipment
 * @param exerciseName Name of the original exercise
 * @param reasons Array of substitution reasons to filter by
 * @returns Filtered array of substitute options
 */
export const getFilteredSubstitutions = (
  exerciseName: string,
  reasons: SubstitutionReason[]
) => {
  const subs = getExerciseSubstitutions(exerciseName);
  if (!subs) return null;
  
  // If no reasons are provided, return all substitutions
  if (!reasons.length) return subs;
  
  // Return substitutions that match ANY of the provided reasons
  return subs.filter(sub => 
    sub.reasonForSubstitution.some(reason => reasons.includes(reason))
  );
};

export default exerciseSubstitutions;