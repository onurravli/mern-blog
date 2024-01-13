interface Result {
  success: boolean;
  error: { message: string | null; code: number };
  data: unknown;
}

export default Result;
