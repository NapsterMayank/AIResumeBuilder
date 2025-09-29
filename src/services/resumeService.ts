// Resume-related API service
import BaseApiService from './baseApiService';
import { RegenerateRequest, RegenerateResponse, ResumeData } from '@/models';
import { API_ENDPOINTS } from '@/config/apiConfig';

class ResumeService extends BaseApiService {
  /**
   * Regenerate text content (objective, experience description, etc.)
   */
  async regenerateContent(request: RegenerateRequest): Promise<string> {
    try {
      const response = await this.post<RegenerateResponse>(
        API_ENDPOINTS.REGENERATE,
        request
      );

      if (!response.data?.rewritten_text) {
        throw new Error("No rewritten text received from API");
      }

      return response.data.rewritten_text;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to regenerate content: ${errorMessage}`);
    }
  }

  /**
   * Save resume data
   */
  async saveResume(resumeData: ResumeData): Promise<{ id: string }> {
    const response = await this.post<{ id: string }>(
      API_ENDPOINTS.RESUME.SAVE,
      resumeData
    );

    if (!response.data?.id) {
      throw new Error("Failed to save resume");
    }

    return response.data;
  }

  /**
   * Load resume data by ID
   */
  async loadResume(id: string): Promise<ResumeData> {
    const response = await this.get<ResumeData>(
      `${API_ENDPOINTS.RESUME.LOAD}/${id}`
    );

    if (!response.data) {
      throw new Error("Failed to load resume");
    }

    return response.data;
  }

  /**
   * Delete resume by ID
   */
  async deleteResume(id: string): Promise<void> {
    await this.delete(
      `${API_ENDPOINTS.RESUME.DELETE}/${id}`
    );
  }

  /**
   * Generate objective suggestions based on user data
   */
  async generateObjectiveSuggestions(context: {
    skills: string[];
    experience: string[];
    targetRole?: string;
  }): Promise<string[]> {
    const response = await this.post<{ suggestions: string[] }>(
      `${API_ENDPOINTS.REGENERATE}/suggestions`,
      {
        type: 'objective',
        context
      }
    );

    return response.data?.suggestions || [];
  }
}

// Export a singleton instance
export const resumeService = new ResumeService();
export default resumeService;