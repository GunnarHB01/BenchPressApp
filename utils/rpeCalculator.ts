// utils/rpeCalculator.ts
/**
 * Calculate 1RM based on weight and reps at a given RPE
 */
export const calculate1RM = (weight: number, reps: number, rpe: number): number => {
    // RPE is on a scale of 1-10
    // RPE 10 means no reps left in reserve
    const repsInReserve = 10 - rpe;
    const totalPossibleReps = reps + repsInReserve;
    
    // Brzycki formula
    const oneRepMax = weight * (36 / (37 - totalPossibleReps));
    
    return Math.round(oneRepMax);
  };
  
  /**
   * Calculate weight to use for a target RPE
   */
  export const calculateWeightForRPE = (
    oneRepMax: number, 
    targetReps: number, 
    targetRPE: number
  ): number => {
    // RPE is on a scale of 1-10
    // RPE 10 means no reps left in reserve
    const repsInReserve = 10 - targetRPE;
    const totalPossibleReps = targetReps + repsInReserve;
    
    // Rearranged Brzycki formula
    const weight = oneRepMax * ((37 - totalPossibleReps) / 36);
    
    return Math.round(weight);
  };