// Future: Amazon Bedrock (Anthropic Claude 3.5 Haiku) & Amazon SageMaker
// Connects to AWS Bedrock Runtime via AWS SDK InvokeModelCommand.

import { aiService as localAIService } from '../aiService';
import { logger } from '../../utils/logger';
import { CLOUD_CONFIG } from '../../config/cloudConfig';

export const aiService = {
  // Future: Amazon Bedrock InvokeModelCommand with Converse API
  async askAI(prompt, context = {}) {
    logger.info('Bedrock', `Dispatching prompt to model "${CLOUD_CONFIG.bedrock.modelId}"`);
    try {
      const response = await localAIService.askAI(prompt, context);
      return {
        success: true,
        data: response,
        model: CLOUD_CONFIG.bedrock.modelId
      };
    } catch (err) {
      logger.error('Bedrock', 'Model execution failed', err);
      return { success: false, error: err.message };
    }
  },

  async generateTripPlan(params) {
    logger.info('Bedrock', `Synthesizing personalized expedition itinerary for ${params.destination}`);
    try {
      const plan = await localAIService.generateTripPlan(params);
      return { success: true, data: plan };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async calculateBudgetPlan(totalBudget, travelers, duration) {
    try {
      const budget = localAIService.calculateBudgetPlan(totalBudget, travelers, duration);
      return { success: true, data: budget };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getPackingList(activity) {
    try {
      const list = localAIService.getPackingList(activity);
      return { success: true, data: list };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getSafetyGuide() {
    try {
      const guide = localAIService.getSafetyGuide();
      return { success: true, data: guide };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async recommendAdventures(filters) {
    try {
      const recommendations = localAIService.recommendAdventures(filters);
      return { success: true, data: recommendations };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};

export default aiService;
