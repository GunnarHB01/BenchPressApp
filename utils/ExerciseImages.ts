/**
 * Enhanced ExerciseImages utility with all exercises from Nippard Bench Press Program
 * Updated to use StrengthLevel.com images with the CORRECT URL structure
 * All images are 800x800 from the /exercises/ directory for consistent display
 */

// Interface for exercise images
export interface ExerciseImageData {
    photo: string;
    illustration: string;
  }
  
  // Base URL for StrengthLevel exercise illustrations
  // Using the correct URL structure that actually works
  const STRENGTHLEVEL_BASE = 'https://static.strengthlevel.com/images/exercises';
  const STRENGTHLEVEL_ILLUSTRATIONS = 'https://static.strengthlevel.com/images/illustrations';
  
  // Comprehensive mapping of exercise names to images
  // Using the correct StrengthLevel URL format with 800x800 resolution
  const exerciseImages: Record<string, ExerciseImageData> = {
    // ======= MAIN BARBELL LIFTS =======
    'BARBELL BENCH PRESS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/bench-press-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/bench-press-1000x1000.jpg`
    },
    'PAUSE BARBELL BENCH PRESS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/bench-press-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/bench-press-1000x1000.jpg`
    },
    'BARBELL SPEED BENCH PRESS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/bench-press-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/bench-press-1000x1000.jpg`
    },
    'BACK SQUAT': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/squat-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/squat-1000x1000.jpg`
    },
    'SQUAT': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/squat-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/squat-1000x1000.jpg`
    },
    'BODYWEIGHT SQUAT': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/squat-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/squat-1000x1000.jpg`
    },
    'DEADLIFT': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/deadlift-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/deadlift-1000x1000.jpg`
    },
  
    // ======= BENCH PRESS VARIATIONS =======
    'DUMBBELL BENCH PRESS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/dumbbell-bench-press-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/dumbbell-bench-press-1000x1000.jpg`
    },
    'INCLINE BENCH PRESS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/incline-bench-press-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/incline-bench-press-1000x1000.jpg`
    },
    'INCLINE BARBELL BENCH PRESS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/incline-bench-press-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/incline-bench-press-1000x1000.jpg`
    },
    'ECCENTRIC-ACCENTUATED BARBELL INCLINE PRESS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/incline-bench-press-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/incline-bench-press-1000x1000.jpg`
    },
    'INCLINE DUMBBELL BENCH PRESS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/incline-dumbbell-bench-press-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/incline-dumbbell-bench-press-1000x1000.jpg`
    },
    'DUMBBELL INCLINE PRESS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/incline-dumbbell-bench-press-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/incline-dumbbell-bench-press-1000x1000.jpg`
    },
    'BARBELL PIN PRESS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/bench-press-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/bench-press-1000x1000.jpg`
    },
    'FLOOR PRESS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/floor-press-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/floor-press-1000x1000.jpg`
    },
    'CLOSE GRIP BENCH PRESS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/close-grip-bench-press-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/close-grip-bench-press-1000x1000.jpg`
    },
    'CABLE FLYE': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/cable-crossover-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/cable-crossover-1000x1000.jpg`
    },
    'DUMBBELL FLY': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/dumbbell-fly-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/dumbbell-fly-1000x1000.jpg`
    },
    
    // ======= PUSH-UP VARIATIONS =======
    'PUSH-UP': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/push-ups-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/push-ups-1000x1000.jpg`
    },
    'PUSHUP': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/push-ups-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/push-ups-1000x1000.jpg`
    },
    'PUSHUPS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/push-ups-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/push-ups-1000x1000.jpg`
    },
    'DIAMOND PUSHUP': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/diamond-push-ups-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/diamond-push-ups-1000x1000.jpg`
    },
    'DIAMOND PUSHUPS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/diamond-push-ups-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/diamond-push-ups-1000x1000.jpg`
    },
    'PIKE PUSH UP': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/pike-push-ups-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/pike-push-ups-1000x1000.jpg`
    },
    'PIKE PUSHUP': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/pike-push-ups-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/pike-push-ups-1000x1000.jpg`
    },
    
    // ======= SQUAT VARIATIONS =======
    'FRONT SQUAT': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/front-squat-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/front-squat-1000x1000.jpg`
    },
    'HACK SQUAT': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/hack-squat-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/hack-squat-1000x1000.jpg`
    },
    'BULGARIAN SPLIT SQUAT': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/bulgarian-split-squat-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/bulgarian-split-squat-1000x1000.jpg`
    },
    
    // ======= DEADLIFT VARIATIONS =======
    'STIFF LEG DEADLIFT': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/romanian-deadlift-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/romanian-deadlift-1000x1000.jpg`
    },
    'BARBELL RDL': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/romanian-deadlift-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/romanian-deadlift-1000x1000.jpg`
    },
    'ROMANIAN DEADLIFT': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/romanian-deadlift-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/romanian-deadlift-1000x1000.jpg`
    },
    
    // ======= PULL EXERCISES =======
    'PULL-UP': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/pull-ups-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/pull-ups-1000x1000.jpg`
    },
    'PULLUP': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/pull-ups-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/pull-ups-1000x1000.jpg`
    },
    'BAND ASSISTED PULLUP': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/assisted-pull-ups-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/assisted-pull-ups-1000x1000.jpg`
    },
    'BAND ASSISTED PULL-UP': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/assisted-pull-ups-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/assisted-pull-ups-1000x1000.jpg`
    },
    'CHIN-UP': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/chin-ups-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/chin-ups-1000x1000.jpg`
    },
    'CHINUP': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/chin-ups-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/chin-ups-1000x1000.jpg`
    },
    'TOWEL CHIN UP': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/chin-ups-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/chin-ups-1000x1000.jpg`
    },
    'TOWEL CHIN UPS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/chin-ups-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/chin-ups-1000x1000.jpg`
    },
    'NEUTRAL-GRIP PULLDOWN': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/lat-pulldown-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/lat-pulldown-1000x1000.jpg`
    },
    'WIDE-GRIP LAT PULLDOWN': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/lat-pulldown-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/lat-pulldown-1000x1000.jpg`
    },
    'SUPINATED PULLDOWN': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/lat-pulldown-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/lat-pulldown-1000x1000.jpg`
    },
    'LAT PULLDOWN': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/lat-pulldown-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/lat-pulldown-1000x1000.jpg`
    },
    
    // ======= ROW EXERCISES =======
    'INVERTED ROW': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/inverted-row-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/inverted-row-1000x1000.jpg`
    },
    'BODYWEIGHT ROW': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/inverted-row-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/inverted-row-1000x1000.jpg`
    },
    'BODYWEIGHT ROWS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/inverted-row-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/inverted-row-1000x1000.jpg`
    },
    'BAND ASSISTED ROW': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/inverted-row-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/inverted-row-1000x1000.jpg`
    },
    'BAND ASSISTED ROWS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/inverted-row-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/inverted-row-1000x1000.jpg`
    },
    'BENT OVER DUMBBELL ROW': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/one-arm-dumbbell-row-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/one-arm-dumbbell-row-1000x1000.jpg`
    },
    'BENT-OVER DUMBBELL ROW': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/one-arm-dumbbell-row-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/one-arm-dumbbell-row-1000x1000.jpg`
    },
    'DUMBBELL ROW': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/one-arm-dumbbell-row-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/one-arm-dumbbell-row-1000x1000.jpg`
    },
    'SEATED CABLE ROW': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/seated-cable-row-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/seated-cable-row-1000x1000.jpg`
    },
    'CABLE ROW': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/seated-cable-row-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/seated-cable-row-1000x1000.jpg`
    },
    'MACHINE CHEST-SUPPORTED T-BAR ROW/RETRACTION': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/t-bar-row-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/t-bar-row-1000x1000.jpg`
    },
    'T-BAR ROW': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/t-bar-row-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/t-bar-row-1000x1000.jpg`
    },
    'SEATED FACE PULL': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/face-pull-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/face-pull-1000x1000.jpg`
    },
    'FACE PULL': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/face-pull-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/face-pull-1000x1000.jpg`
    },
    
    // ======= SHOULDER EXERCISES =======
    'MILITARY PRESS': {
      photo: `${STRENGTHLEVEL_BASE}/military-press/military-press-800.avif`,
      illustration: `${STRENGTHLEVEL_BASE}/military-press/military-press-800.avif`
    },
    'OVERHEAD PRESS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/overhead-press-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/overhead-press-1000x1000.jpg`
    },
    'SEATED DUMBBELL PRESS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/dumbbell-shoulder-press-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/dumbbell-shoulder-press-1000x1000.jpg`
    },
    'DUMBBELL SHOULDER PRESS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/dumbbell-shoulder-press-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/dumbbell-shoulder-press-1000x1000.jpg`
    },
    'LANDMINE PRESS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/landmine-press-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/landmine-press-1000x1000.jpg`
    },
    'DUMBBELL LATERAL RAISE': {
      photo: `${STRENGTHLEVEL_BASE}/dumbbell-lateral-raise/dumbbell-lateral-raise-800.avif`,
      illustration: `${STRENGTHLEVEL_BASE}/dumbbell-lateral-raise/dumbbell-lateral-raise-800.avif`
    },
    'LATERAL RAISE': {
      photo: `${STRENGTHLEVEL_BASE}/dumbbell-lateral-raise/dumbbell-lateral-raise-800.avif`,
      illustration: `${STRENGTHLEVEL_BASE}/dumbbell-lateral-raise/dumbbell-lateral-raise-800.avif`
    },
    'REVERSE PEC DECK': {
      photo: `${STRENGTHLEVEL_BASE}/machine-reverse-fly/machine-reverse-fly-800.avif`,
      illustration: `${STRENGTHLEVEL_BASE}/machine-reverse-fly/machine-reverse-fly-800.avif`
    },
    'PRONE TRAP RAISE': {
      photo: `${STRENGTHLEVEL_BASE}/dumbbell-reverse-fly/dumbbell-reverse-fly-800.avif`,
      illustration: `${STRENGTHLEVEL_BASE}/dumbbell-reverse-fly/dumbbell-reverse-fly-800.avif`
    },
    
    // ======= ARM EXERCISES =======
    'BARBELL FLOOR SKULL CRUSHER': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/lying-tricep-extension-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/lying-tricep-extension-1000x1000.jpg`
    },
    'DUMBBELL FLOOR SKULL CRUSHER': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/lying-tricep-extension-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/lying-tricep-extension-1000x1000.jpg`
    },
    'SKULL CRUSHER': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/lying-tricep-extension-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/lying-tricep-extension-1000x1000.jpg`
    },
    'OVERHEAD TRICEP EXTENSION': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/overhead-tricep-extension-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/overhead-tricep-extension-1000x1000.jpg`
    },
    'OVERHEAD TRICEP EXTENSIONS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/overhead-tricep-extension-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/overhead-tricep-extension-1000x1000.jpg`
    },
    'V-BAR PRESSDOWN': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/tricep-pushdown-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/tricep-pushdown-1000x1000.jpg`
    },
    'TRICEP PUSHDOWN': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/tricep-pushdown-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/tricep-pushdown-1000x1000.jpg`
    },
    'HAMMER CURL': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/hammer-curl-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/hammer-curl-1000x1000.jpg`
    },
    'BAND HAMMER CURL': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/hammer-curl-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/hammer-curl-1000x1000.jpg`
    },
    'BAND HAMMER CURLS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/hammer-curl-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/hammer-curl-1000x1000.jpg`
    },
    'CROSS BODY HAMMER CURL': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/hammer-curl-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/hammer-curl-1000x1000.jpg`
    },
    'CROSS BODY HAMMER CURLS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/hammer-curl-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/hammer-curl-1000x1000.jpg`
    },
    'EZ BAR CURL': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/barbell-curl-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/barbell-curl-1000x1000.jpg`
    },
    'BARBELL CURL': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/barbell-curl-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/barbell-curl-1000x1000.jpg`
    },
    'DIP': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/dips-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/dips-1000x1000.jpg`
    },
    'DIPS': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/dips-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/dips-1000x1000.jpg`
    },
    
    // ======= LEG EXERCISES =======
    'LEG PRESS': {
      photo: 'https://static.strengthlevel.com/images/exercises/sled-leg-press/sled-leg-press-800.avif',
      illustration: 'https://static.strengthlevel.com/images/exercises/sled-leg-press/sled-leg-press-800.avif'
    },
    'LEG EXTENSION': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/leg-extension-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/leg-extension-1000x1000.jpg`
    },
    'LYING LEG CURL': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/lying-leg-curl-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/lying-leg-curl-1000x1000.jpg`
    },
    'ECCENTRIC-ACCENTUATED LYING LEG CURL': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/lying-leg-curl-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/lying-leg-curl-1000x1000.jpg`
    },
    'SEATED LEG CURL': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/seated-leg-curl-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/seated-leg-curl-1000x1000.jpg`
    },
    'DUMBBELL WALKING LUNGE': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/walking-lunge-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/walking-lunge-1000x1000.jpg`
    },
    'WALKING LUNGE': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/walking-lunge-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/walking-lunge-1000x1000.jpg`
    },
    'LUNGE': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/walking-lunge-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/walking-lunge-1000x1000.jpg`
    },
    'BARBELL HIP THRUST': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/hip-thrust-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/hip-thrust-1000x1000.jpg`
    },
    'HIP THRUST': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/hip-thrust-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/hip-thrust-1000x1000.jpg`
    },
    'REVERSE HYPEREXTENSION': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/reverse-hyperextension-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/reverse-hyperextension-1000x1000.jpg`
    },
    'STANDING CALF RAISE': {
      photo: `${STRENGTHLEVEL_BASE}/machine-calf-raise/machine-calf-raise-800.avif`,
      illustration: `${STRENGTHLEVEL_BASE}/machine-calf-raise/machine-calf-raise-800.avif`
    },
    'CALF RAISE': {
      photo: `${STRENGTHLEVEL_BASE}/machine-calf-raise/machine-calf-raise-800.avif`,
      illustration: `${STRENGTHLEVEL_BASE}/machine-calf-raise/machine-calf-raise-800.avif`
    },
    
    // ======= KETTLEBELL EXERCISES =======
    'KETTLEBELL SWING': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/kettlebell-swing-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/kettlebell-swing-1000x1000.jpg`
    },
    'KB SWING': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/kettlebell-swing-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/kettlebell-swing-1000x1000.jpg`
    },
    
    // Default fallback image (bench press as default)
    'DEFAULT': {
      photo: `${STRENGTHLEVEL_ILLUSTRATIONS}/bench-press-1000x1000.jpg`,
      illustration: `${STRENGTHLEVEL_ILLUSTRATIONS}/bench-press-1000x1000.jpg`
    }
  };
  
  // Cache for image URLs by exercise name to prevent excessive lookups
  const imageCache: Record<string, ExerciseImageData> = {};
  
  /**
   * Gets both photo and illustration for a specific exercise
   * Uses StrengthLevel's consistent 400x400 image format for optimal mobile display
   * Implements caching and fallback logic for consistent image display
   * 
   * @param exerciseName - The name of the exercise to get images for
   * @returns Object with photo and illustration URLs
   */
  export const getExerciseImages = (exerciseName: string): ExerciseImageData => {
    if (!exerciseName) {
      console.warn('No exercise name provided to getExerciseImages');
      return exerciseImages['DEFAULT'];
    }
    
    // Normalize the exercise name to prevent case sensitivity issues
    const normalizedName = exerciseName.toUpperCase().trim();
    
    // Check cache first to prevent excessive lookups
    if (imageCache[normalizedName]) {
      return imageCache[normalizedName];
    }
    
    // For debugging
    console.log(`Looking for images for: ${normalizedName}`);
    
    let result: ExerciseImageData;
    
    try {
      // Try exact match first
      if (exerciseImages[normalizedName]) {
        console.log(`Found exact match for: ${normalizedName}`);
        result = exerciseImages[normalizedName];
      } else {
        // Try partial match - look for keywords in the exercise name
        let found = false;
        
        // Sort keys by length (descending) to match the most specific first
        // This ensures that more specific matches like "BARBELL BENCH PRESS" are
        // found before more general ones like "BENCH PRESS"
        const sortedKeys = Object.keys(exerciseImages)
          .filter(key => key !== 'DEFAULT')
          .sort((a, b) => b.length - a.length);
        
        for (const key of sortedKeys) {
          // Check if the normalized name contains the key or vice versa
          if (normalizedName.includes(key) || key.includes(normalizedName)) {
            console.log(`Found partial match: ${normalizedName} matches with ${key}`);
            result = exerciseImages[key];
            found = true;
            break;
          }
        }
        
        // Use default image if no match found
        if (!found) {
          console.warn(`No match found for: ${normalizedName}, using default`);
          result = exerciseImages['DEFAULT'];
        }
      }
    } catch (error) {
      console.error(`Error getting images for ${normalizedName}:`, error);
      result = exerciseImages['DEFAULT'];
    }
    
    // Validate URLs before caching
    if (!result || !result.photo || !result.illustration) {
      console.warn(`Invalid image data for ${normalizedName}, using default`);
      result = exerciseImages['DEFAULT'];
    }
    
    // Cache the result to prevent future lookups
    imageCache[normalizedName] = result;
    return result;
  };
  
  /**
   * Get just the illustration image for an exercise (for backward compatibility)
   */
  export const getExerciseImage = (exerciseName: string): string => {
    const images = getExerciseImages(exerciseName);
    return images.illustration;
  };
  
  /**
   * Clear the image cache (useful for development/testing)
   */
  export const clearImageCache = (): void => {
    Object.keys(imageCache).forEach(key => delete imageCache[key]);
  };
  
  /**
   * Get all available exercise names (useful for debugging)
   */
  export const getAvailableExercises = (): string[] => {
    return Object.keys(exerciseImages).filter(key => key !== 'DEFAULT');
  };
  
  /**
   * Test if an image URL is accessible (useful for validation)
   */
  export const testImageUrl = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };
  
  export default {
    getExerciseImages,
    getExerciseImage,
    clearImageCache,
    getAvailableExercises,
    testImageUrl
  };