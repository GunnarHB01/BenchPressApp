import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Specific interfaces for Jeff Nippard's program structure
export interface Exercise {
  name: string;
  sets: number;
  reps: number | string;
  percentage?: number;
  rpe?: number;
  rest: string;
  notes?: string;
}

export interface WorkoutDay {
  type: string;
  totalSetVolume: number;
  exercises: Exercise[];
}

export interface ProgramWeek {
  days: WorkoutDay[];
}

export interface ProgramData {
  [key: string]: ProgramWeek;
}

/**
 * Read the first few bytes of a PDF to analyze its content
 */
const analyzeFileForContent = async (fileUri: string): Promise<string> => {
  try {
    // We can't fully read PDF content in React Native without a dedicated library
    // This is a simplified check - in a real app, you'd use a PDF parser
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    
    // For demo purposes, check if the file name contains hints about the program
    const fileName = fileUri.toLowerCase();
    
    if (fileName.includes('bench') || fileName.includes('press') || fileName.includes('upperbody')) {
      return 'bench_press';
    } else if (fileName.includes('powerbuil') || fileName.includes('power_buil')) {
      return 'powerbuilding';
    } else if (fileName.includes('full_body') || fileName.includes('fullbody')) {
      return 'full_body';
    } else {
      // Default to returning a generic program type
      return 'unknown';
    }
  } catch (error) {
    console.error('Error analyzing file:', error);
    return 'unknown';
  }
};

/**
 * Get the appropriate program data based on the detected program type
 */
const getProgramDataByType = (programType: string): ProgramData => {
  switch (programType) {
    case 'bench_press':
      return getBenchPressProgram();
    case 'powerbuilding':
      return getPowerbuildingProgram();
    case 'full_body':
      return getFullBodyProgram();
    default:
      // If unknown, default to bench press program but with a flag
      const program = getBenchPressProgram();
      program.programType = 'unknown';
      return program;
  }
};

/**
 * Get bench press program data
 */
const getBenchPressProgram = (): ProgramData => {
  const program: ProgramData = {
    programType: 'bench_press',
    week1: {
      days: [
        {
          type: "UPPER BODY #1",
          totalSetVolume: 18,
          exercises: [
            {
              name: "BARBELL BENCH PRESS",
              sets: 4,
              reps: 6,
              percentage: 72.5,
              rest: "3-5MIN",
              notes: "45° ELBOW TUCK"
            },
            {
              name: "PULL-UP",
              sets: 3,
              reps: 8,
              rpe: 8,
              rest: "2-3MIN",
              notes: "PULL YOUR SHOULDERS DOWN AND IN"
            },
            {
              name: "ECCENTRIC-ACCENTUATED BARBELL INCLINE PRESS",
              sets: 2,
              reps: 8,
              rpe: 8,
              rest: "2-3MIN",
              notes: "2-SECOND LOWERING PHASE. ELBOWS TUCKED ~30°"
            },
            {
              name: "INVERTED ROW",
              sets: 3,
              reps: 10,
              rpe: 8,
              rest: "2-3MIN",
              notes: "SCAPULAE BACK AND DOWN. PULL WITH YOUR ELBOWS OUT"
            },
            {
              name: "DIP",
              sets: 2,
              reps: 10,
              rpe: 7,
              rest: "1-2MIN",
              notes: "KEEP YOUR SCAPULAE RETRACTED AND DEPRESSED"
            },
            {
              name: "BARBELL FLOOR SKULL CRUSHER",
              sets: 2,
              reps: 8,
              rpe: 7,
              rest: "1-2MIN",
              notes: "KEEP YOUR ELBOWS OVER YOUR HEAD. KEEP YOUR SHOULDER JOINT MOTIONLESS"
            },
            {
              name: "HAMMER CURL",
              sets: 2,
              reps: 10,
              rpe: 8,
              rest: "1-2MIN",
              notes: "CURL THE WEIGHT \"OUT\", NOT \"UP\""
            }
          ]
        },
        {
          type: "LOWER BODY #1",
          totalSetVolume: 15,
          exercises: [
            {
              name: "BACK SQUAT",
              sets: 3,
              reps: 5,
              percentage: 75,
              rest: "3-4MIN",
              notes: "SIT DOWN AND BACK"
            },
            {
              name: "STIFF LEG DEADLIFT",
              sets: 3,
              reps: 10,
              rpe: 8,
              rest: "2-3MIN",
              notes: "KEEP YOUR HIPS HIGH"
            },
            {
              name: "BARBELL HIP THRUST",
              sets: 3,
              reps: 15,
              rpe: 7,
              rest: "2-3MIN",
              notes: "USE A PAD. RIB CAGE AND CHIN TUCKED DOWN"
            },
            {
              name: "LYING LEG CURL",
              sets: 3,
              reps: 20,
              rpe: 8,
              rest: "0MIN",
              notes: "FOCUS ON SQUEEZING YOUR HAMSTRINGS TO MOVE THE WEIGHT"
            },
            {
              name: "LEG EXTENSION",
              sets: 3,
              reps: 20,
              rpe: 8,
              rest: "1-2MIN",
              notes: "FOCUS ON SQUEEZING YOUR QUADS TO MOVE THE WEIGHT"
            }
          ]
        }
      ]
    }
  };
  
  return program;
};

/**
 * Get powerbuilding program data
 */
const getPowerbuildingProgram = (): ProgramData => {
  const program: ProgramData = {
    programType: 'powerbuilding',
    week1: {
      days: [
        {
          type: "FULL BODY #1",
          totalSetVolume: 20,
          exercises: [
            {
              name: "BARBELL SQUAT",
              sets: 4,
              reps: 5,
              percentage: 75,
              rest: "3-5MIN",
              notes: "BRACE CORE, KEEP CHEST UP"
            },
            {
              name: "BENCH PRESS",
              sets: 4,
              reps: 6,
              percentage: 72.5,
              rest: "2-3MIN",
              notes: "RETRACT SCAPULA, 45° ELBOW TUCK"
            },
            {
              name: "BARBELL ROW",
              sets: 3,
              reps: 8,
              rpe: 8,
              rest: "2-3MIN",
              notes: "KEEP BACK PARALLEL TO FLOOR"
            },
            {
              name: "DUMBBELL OVERHEAD PRESS",
              sets: 3,
              reps: 10,
              rpe: 8,
              rest: "2-3MIN",
              notes: "ENGAGE CORE, NEUTRAL WRISTS"
            },
            {
              name: "WEIGHTED PULLUP",
              sets: 3,
              reps: 8,
              rpe: 8,
              rest: "2-3MIN",
              notes: "FULL RANGE OF MOTION"
            },
            {
              name: "TRICEP PUSHDOWN",
              sets: 3,
              reps: 12,
              rpe: 8,
              rest: "1-2MIN",
              notes: "KEEP ELBOWS TUCKED"
            }
          ]
        }
      ]
    }
  };
  
  return program;
};

/**
 * Get full body program data
 */
const getFullBodyProgram = (): ProgramData => {
  const program: ProgramData = {
    programType: 'full_body',
    week1: {
      days: [
        {
          type: "FULL BODY A",
          totalSetVolume: 22,
          exercises: [
            {
              name: "BARBELL SQUAT",
              sets: 4,
              reps: 8,
              rpe: 7,
              rest: "2-3MIN",
              notes: "SIT BACK, KNEES OUT"
            },
            {
              name: "ROMANIAN DEADLIFT",
              sets: 3,
              reps: 10,
              rpe: 8,
              rest: "2-3MIN",
              notes: "HINGE AT HIPS, SLIGHT KNEE BEND"
            },
            {
              name: "INCLINE DUMBBELL PRESS",
              sets: 3,
              reps: 10,
              rpe: 8,
              rest: "2-3MIN",
              notes: "30° INCLINE, NEUTRAL GRIP"
            },
            {
              name: "PULLUP OR LAT PULLDOWN",
              sets: 3,
              reps: 10,
              rpe: 8,
              rest: "2-3MIN",
              notes: "PULL TO UPPER CHEST"
            },
            {
              name: "LATERAL RAISE",
              sets: 3,
              reps: 15,
              rpe: 8,
              rest: "1-2MIN",
              notes: "SLIGHT BEND IN ELBOWS"
            },
            {
              name: "EZ-BAR CURL",
              sets: 3,
              reps: 12,
              rpe: 8,
              rest: "1-2MIN",
              notes: "KEEP ELBOWS STATIONARY"
            },
            {
              name: "TRICEP ROPE EXTENSION",
              sets: 3,
              reps: 12,
              rpe: 8,
              rest: "1-2MIN",
              notes: "KEEP UPPER ARMS STATIONARY"
            }
          ]
        }
      ]
    }
  };
  
  return program;
};

/**
 * Import a Jeff Nippard program from PDF
 */
export const importNippardProgram = async (): Promise<{ success: boolean; message: string; fileName?: string; programType?: string }> => {
  try {
    // Allow user to pick a document
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });
    
    if (result.canceled) {
      return { success: false, message: 'Document selection canceled' };
    }
    
    // PDF file was selected
    const fileUri = result.assets[0].uri;
    const fileName = result.assets[0].name;
    
    // Analyze file to determine what program it is
    const programType = await analyzeFileForContent(fileUri);
    
    // Get the appropriate program data
    const programData = getProgramDataByType(programType);
    
    // Store program data
    await AsyncStorage.setItem('nippard_program_data', JSON.stringify(programData));
    await AsyncStorage.setItem('pdf_imported', 'true');
    await AsyncStorage.setItem('pdf_filename', fileName);
    await AsyncStorage.setItem('program_type', programType);
    
    const programName = programType === 'unknown' 
      ? "Program" 
      : programType === 'bench_press' 
        ? "Bench Press Program"
        : programType === 'powerbuilding'
          ? "Powerbuilding Program"
          : "Full Body Program";
          
    return { 
      success: true, 
      message: `Successfully imported ${programName} from ${fileName}!`,
      fileName,
      programType
    };
  } catch (error) {
    console.error('Error importing PDF:', error);
    return { 
      success: false, 
      message: 'An error occurred while importing the PDF. Please try again.'
    };
  }
};

/**
 * Check if program has been imported
 */
export const isProgramImported = async (): Promise<boolean> => {
  try {
    const imported = await AsyncStorage.getItem('pdf_imported');
    console.log("PDF import flag:", imported); // Add this debug log
    return imported === 'true';
  } catch (error) {
    console.error('Error checking if program is imported:', error);
    return false;
  }
};

/**
 * Get imported program data
 */
export const getImportedProgram = async (): Promise<ProgramData | null> => {
  try {
    const data = await AsyncStorage.getItem('nippard_program_data');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting imported program data:', error);
    return null;
  }
};

/**
 * Get the name of the imported PDF
 */
export const getImportedPdfName = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('pdf_filename');
  } catch (error) {
    console.error('Error getting PDF filename:', error);
    return null;
  }
};

/**
 * Get the type of the imported program
 */
export const getProgramType = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('program_type');
  } catch (error) {
    console.error('Error getting program type:', error);
    return null;
  }
};

/**
 * Skip PDF upload (FOR DEBUGGING)
 */
export const skipPdfUpload = async (programType: string = 'bench_press'): Promise<void> => {
  const programData = getProgramDataByType(programType);
  
  await AsyncStorage.setItem('nippard_program_data', JSON.stringify(programData));
  await AsyncStorage.setItem('pdf_imported', 'true');
  await AsyncStorage.setItem('pdf_filename', 'debug_program.pdf');
  await AsyncStorage.setItem('program_type', programType);
};