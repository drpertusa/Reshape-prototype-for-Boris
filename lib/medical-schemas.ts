// Medical-specific schemas for healthcare SEO
// Implements MedicalCondition, MedicalTherapy, and related schemas

import { SITE_CONFIG } from './constants'
import { site } from './site'

interface MedicalConditionProps {
  name: string
  description: string
  symptoms?: string[]
  causes?: string[]
  treatments?: string[]
  preventionTips?: string[]
  riskFactors?: string[]
  medicalCode?: {
    code: string
    codingSystem: 'ICD-10' | 'ICD-11' | 'SNOMED-CT'
  }
}

export function generateMedicalConditionSchema({
  name,
  description,
  symptoms = [],
  causes = [],
  treatments = [],
  preventionTips = [],
  riskFactors = [],
  medicalCode
}: MedicalConditionProps) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    name,
    description,
    ...(symptoms.length > 0 && {
      signOrSymptom: symptoms.map(symptom => ({
        '@type': 'MedicalSignOrSymptom',
        name: symptom
      }))
    }),
    ...(causes.length > 0 && {
      cause: causes.map(cause => ({
        '@type': 'MedicalCause',
        name: cause
      }))
    }),
    ...(treatments.length > 0 && {
      possibleTreatment: treatments.map(treatment => ({
        '@type': 'MedicalTherapy',
        name: treatment
      }))
    }),
    ...(preventionTips.length > 0 && {
      primaryPrevention: preventionTips.map(tip => ({
        '@type': 'LifestyleModification',
        name: tip
      }))
    }),
    ...(riskFactors.length > 0 && {
      riskFactor: riskFactors.map(factor => ({
        '@type': 'MedicalRiskFactor',
        name: factor
      }))
    }),
    ...(medicalCode && {
      code: {
        '@type': 'MedicalCode',
        code: medicalCode.code,
        codingSystem: medicalCode.codingSystem
      }
    })
  }
  
  return schema
}

interface MedicalTherapyProps {
  name: string
  description: string
  therapyType: 'Surgical' | 'Non-Surgical' | 'Minimally Invasive' | 'Regenerative'
  duration?: string
  frequency?: string
  benefits?: string[]
  risks?: string[]
  preparation?: string[]
  recovery?: string
  contraindications?: string[]
}

export function generateMedicalTherapySchema({
  name,
  description,
  therapyType,
  duration,
  frequency,
  benefits = [],
  risks = [],
  preparation = [],
  recovery,
  contraindications = []
}: MedicalTherapyProps) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name,
    description,
    procedureType: {
      '@type': 'MedicalProcedureType',
      name: therapyType
    },
    ...(duration && { duration }),
    ...(frequency && { frequency }),
    ...(benefits.length > 0 && {
      potentialAction: benefits.map(benefit => ({
        '@type': 'MedicalAction',
        name: benefit
      }))
    }),
    ...(risks.length > 0 && {
      seriousAdverseOutcome: risks.map(risk => ({
        '@type': 'MedicalRisk',
        name: risk
      }))
    }),
    ...(preparation.length > 0 && {
      preparation: preparation.join('. ')
    }),
    ...(recovery && {
      followup: recovery
    }),
    ...(contraindications.length > 0 && {
      contraindication: contraindications.map(item => ({
        '@type': 'MedicalContraindication',
        name: item
      }))
    })
  }
  
  return schema
}

interface DrugSchema {
  name: string
  description: string
  activeIngredient?: string
  dosageForm?: string
  administrationRoute?: string
  prescriptionStatus?: 'PrescriptionOnly' | 'OTC'
  warnings?: string[]
  sideEffects?: string[]
}

export function generateDrugSchema({
  name,
  description,
  activeIngredient,
  dosageForm,
  administrationRoute,
  prescriptionStatus,
  warnings = [],
  sideEffects = []
}: DrugSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Drug',
    name,
    description,
    ...(activeIngredient && { activeIngredient }),
    ...(dosageForm && { dosageForm }),
    ...(administrationRoute && { administrationRoute }),
    ...(prescriptionStatus && { prescriptionStatus }),
    ...(warnings.length > 0 && {
      warning: warnings.join('. ')
    }),
    ...(sideEffects.length > 0 && {
      adverseOutcome: sideEffects.map(effect => ({
        '@type': 'MedicalRisk',
        name: effect
      }))
    })
  }
}

interface MedicalWebPageProps {
  url: string
  title: string
  description: string
  lastReviewed: string
  reviewedBy: {
    name: string
    credentials: string
  }
  medicalAudience?: 'Patient' | 'Physician' | 'MedicalResearcher'
  aspect?: string
}

export function generateMedicalWebPageSchema({
  url,
  title,
  description,
  lastReviewed,
  reviewedBy,
  medicalAudience = 'Patient',
  aspect
}: MedicalWebPageProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    url,
    name: title,
    description,
    lastReviewed,
    reviewedBy: {
      '@type': 'Person',
      name: reviewedBy.name,
      honorificSuffix: reviewedBy.credentials,
      '@id': '#medical-reviewer'
    },
    medicalAudience: {
      '@type': medicalAudience,
      audienceType: medicalAudience
    },
    ...(aspect && { aspect }),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: site.url
    }
  }
}

// Generate schema for aesthetic procedures
export function generateAestheticProcedureSchema({
  name,
  description,
  duration,
  anesthesia,
  recovery,
  results,
  suitableFor
}: {
  name: string
  description: string
  duration: string
  anesthesia?: string
  recovery: string
  results: string
  suitableFor: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name,
    description,
    procedureType: {
      '@type': 'MedicalProcedureType',
      name: 'Aesthetic Surgery'
    },
    duration,
    ...(anesthesia && {
      usesDevice: {
        '@type': 'MedicalDevice',
        name: anesthesia
      }
    }),
    followup: recovery,
    outcome: results,
    relevantSpecialty: 'PlasticSurgery',
    typicalTest: suitableFor.map(condition => ({
      '@type': 'MedicalTest',
      name: `Suitability assessment for ${condition}`
    }))
  }
}

// Generate schema for regenerative medicine treatments
export function generateRegenerativeTreatmentSchema({
  name,
  description,
  technique,
  cellType,
  applicationMethod,
  conditions,
  expectedOutcomes
}: {
  name: string
  description: string
  technique: string
  cellType?: string
  applicationMethod: string
  conditions: string[]
  expectedOutcomes: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name,
    description,
    category: 'Regenerative Medicine',
    procedureType: {
      '@type': 'MedicalProcedureType',
      name: technique
    },
    ...(cellType && {
      usesHealthPlanIdProtocol: {
        '@type': 'Protocol',
        name: `${cellType} Protocol`
      }
    }),
    howPerformed: applicationMethod,
    applicableLocation: conditions.map(condition => ({
      '@type': 'MedicalCondition',
      name: condition
    })),
    expectedPrognosis: expectedOutcomes.join('. ')
  }
}