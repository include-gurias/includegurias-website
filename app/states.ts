"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import IncludeInfo from "types/data/includeInfo";
import Material from "types/data/material";
import News from "types/data/news";
import Partner from "types/data/partner";
import SocialMedia from "types/data/socialMedia";
import SocialMediaPost from "types/data/socialMediaPost";
import { OldMember, ScholarshipMember, TeamMember } from "types/data/team";
import Testimonial from "types/data/testimonial";
import video from "types/data/video";
import Activity from "types/data/activities";

interface MaterialsState {
  materials: Material[];
  setMaterials: (materials: Material[]) => void;
  getMaterials: () => Promise<Material[]>;
  materials_loading: boolean;
  setLoading: (loading: boolean) => void;
  updateMaterials: (materials: Material[]) => Promise<void>;
}

export const useMaterialsStore = create(
  persist<MaterialsState>(
    (set, get) => ({
      materials: [],
      materials_loading: true,
      setLoading: (loading) => set({ materials_loading: loading }),
      setMaterials: (materials) => set({ materials }),
      getMaterials: async () => {
  // Remova o "if (length === 0)". Deixe ele buscar sempre!
  set({ materials_loading: true });
  try {
    const response = await fetch("/api/dashboard/materials");
    if (response.ok) {
      const data = (await response.json()) as Material[];
      set({ materials: data }); 
      return data;
    } else {
      console.error("Erro ao buscar materiais:", response.status);
      return get().materials; 
    }
  } catch (error) {
    console.error("Erro ao buscar materiais:", error);
    return get().materials;
  } finally {
    set({ materials_loading: false });
  }
},
      updateMaterials: async (materials) => {
        set({ materials_loading: true });
        try {
          const response = await fetch("/api/dashboard/materials", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(materials),
          });
          if (response.ok) {
            set({ materials });
          } else {
            console.error("Erro ao atualizar materiais:", response.status);
          }
        } catch (error) {
          console.error("Erro ao atualizar materiais:", error);
        } finally {
          set({ materials_loading: false });
        }
      },
    }),
    {
      name: "materials",
    }
  )
);

interface TestimonialState {
  testimonials: Testimonial[];
  setTestimonials: (testimonials: Testimonial[]) => void;
  getTestimonials: () => Promise<Testimonial[]>;
  testimonial_loading: boolean;
  setLoading: (loading: boolean) => void;
  updateTestimonials: (testimonials: Testimonial[]) => Promise<void>;
}

export const useTestimonialsStore = create(
  persist<TestimonialState>(
    (set, get) => ({
      testimonials: [],
      testimonial_loading: true,
      setLoading: (loading) => set({ testimonial_loading: loading }),
      setTestimonials: (testimonials) => set({ testimonials }),
      getTestimonials: async () => {
        if (get().testimonials.length === 0) {
          set({ testimonial_loading: true });
          try {
            const response = await fetch("/api/dashboard/testimonials");
            if (response.ok) {
              const data = (await response.json()) as Testimonial[];
              set({ testimonials: data });
              return data;
            } else {
              console.error("Erro ao buscar depoimentos:", response.status);
              return [];
            }
          } catch (error) {
            console.error("Erro ao buscar depoimentos:", error);
            return [];
          } finally {
            set({ testimonial_loading: false });
          }
        } else {
          set({ testimonial_loading: false });
          return get().testimonials;
        }
      },
      updateTestimonials: async (testimonials) => {
        set({ testimonial_loading: true });
        try {
          const response = await fetch("/api/dashboard/testimonials", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(testimonials),
          });
          if (response.ok) {
            set({ testimonials });
          } else {
            console.error("Erro ao atualizar depoimentos:", response.status);
          }
        } catch (error) {
          console.error("Erro ao atualizar depoimentos:", error);
        } finally {
          set({ testimonial_loading: false });
        }
      },
    }),
    {
      name: "testimonials",
    }
  )
);

interface PrimaryPageVideosState {
  primaryPageVideos: video[];
  setPrimaryPageVideos: (primaryPageVideos: video[]) => void;
  getPrimaryPageVideos: () => Promise<video[]>;
  primaryPageVideosLoading: boolean;
  setLoading: (loading: boolean) => void;
  updatePrimaryPageVideos: (primaryPageVideos: video[]) => Promise<void>;
}

export const usePrimaryPageVideosStore = create(
  persist<PrimaryPageVideosState>(
    (set, get) => ({
      primaryPageVideos: [],
      primaryPageVideosLoading: true,
      setLoading: (loading) => set({ primaryPageVideosLoading: loading }),
      setPrimaryPageVideos: (primaryPageVideos) => set({ primaryPageVideos }),
      getPrimaryPageVideos: async () => {
        if (get().primaryPageVideos.length === 0) {
          set({ primaryPageVideosLoading: true });
          try {
            const response = await fetch("/api/dashboard/primaryPageVideos");
            if (response.ok) {
              const data = (await response.json()) as video[];
              set({ primaryPageVideos: data });
              return data;
            } else {
              console.error(
                "Erro ao buscar vídeos da página principal:",
                response.status
              );
              return [];
            }
          } catch (error) {
            console.error("Erro ao buscar vídeos da página principal:", error);
            return [];
          } finally {
            set({ primaryPageVideosLoading: false });
          }
        } else {
          set({ primaryPageVideosLoading: false });
          return get().primaryPageVideos;
        }
      },
      updatePrimaryPageVideos: async (primaryPageVideos) => {
        set({ primaryPageVideosLoading: true });
        try {
          const response = await fetch("/api/dashboard/primaryPageVideos", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(primaryPageVideos),
          });
          if (response.ok) {
            set({ primaryPageVideos });
          } else {
            console.error(
              "Erro ao atualizar vídeos da página principal:",
              response.status
            );
          }
        } catch (error) {
          console.error("Erro ao atualizar vídeos da página principal:", error);
        } finally {
          set({ primaryPageVideosLoading: false });
        }
      },
    }),
    {
      name: "primaryPageVideos",
    }
  )
);

interface SocialMediaState {
  socialMedia: SocialMedia[];
  setSocialMedia: (socialMedia: SocialMedia[]) => void;
  getSocialMedia: () => Promise<SocialMedia[]>;
  socialMediaLoading: boolean;
  setLoading: (loading: boolean) => void;
  updateSocialMedia: (socialMedia: SocialMedia[]) => Promise<void>;
}

export const useSocialMediaStore = create(
  persist<SocialMediaState>(
    (set, get) => ({
      socialMedia: [],
      socialMediaLoading: true,
      setLoading: (loading) => set({ socialMediaLoading: loading }),
      setSocialMedia: (socialMedia) => set({ socialMedia }),
      getSocialMedia: async () => {
        if (get().socialMedia.length === 0) {
          set({ socialMediaLoading: true });
          try {
            const response = await fetch("/api/dashboard/socialMedia");
            if (response.ok) {
              const data = (await response.json()) as SocialMedia[];
              set({ socialMedia: data });
              return data;
            } else {
              console.error("Erro ao buscar redes sociais:", response.status);
              return [];
            }
          } catch (error) {
            console.error("Erro ao buscar redes sociais:", error);
            return [];
          } finally {
            set({ socialMediaLoading: false });
          }
        } else {
          set({ socialMediaLoading: false });
          return get().socialMedia;
        }
      },
      updateSocialMedia: async (socialMedia) => {
        set({ socialMediaLoading: true });
        try {
          const response = await fetch("/api/dashboard/socialMedia", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(socialMedia),
          });
          if (response.ok) {
            set({ socialMedia });
          } else {
            console.error("Erro ao atualizar redes sociais:", response.status);
          }
        } catch (error) {
          console.error("Erro ao atualizar redes sociais:", error);
        } finally {
          set({ socialMediaLoading: false });
        }
      },
    }),
    {
      name: "socialMedia",
    }
  )
);

interface PartnersState {
  partners: Partner[];
  setPartners: (partners: Partner[]) => void;
  getPartners: () => Promise<Partner[]>;
  partnersLoading: boolean;
  setLoading: (loading: boolean) => void;
  updatePartners: (partners: Partner[]) => Promise<void>;
}

export const usePartnersStore = create(
  persist<PartnersState>(
    (set, get) => ({
      partners: [],
      partnersLoading: true,
      setLoading: (loading) => set({ partnersLoading: loading }),
      setPartners: (partners) => set({ partners }),
      getPartners: async () => {
        if (get().partners.length === 0) {
          set({ partnersLoading: true });
          try {
            const response = await fetch("/api/dashboard/partners");
            if (response.ok) {
              const data = (await response.json()) as Partner[];
              set({ partners: data });
              return data;
            } else {
              console.error("Erro ao buscar parceiros:", response.status);
              return [];
            }
          } catch (error) {
            console.error("Erro ao buscar parceiros:", error);
            return [];
          } finally {
            set({ partnersLoading: false });
          }
        } else {
          set({ partnersLoading: false });
          return get().partners;
        }
      },
      updatePartners: async (partners) => {
        set({ partnersLoading: true });
        try {
          const response = await fetch("/api/dashboard/partners", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(partners),
          });
          if (response.ok) {
            set({ partners });
          } else {
            console.error("Erro ao atualizar parceiros:", response.status);
          }
        } catch (error) {
          console.error("Erro ao atualizar parceiros:", error);
        } finally {
          set({ partnersLoading: false });
        }
      },
    }),
    {
      name: "partners",
    }
  )
);

interface IncludeInfoState {
  includeInfo: IncludeInfo[];
  setIncludeInfo: (includeInfo: IncludeInfo[]) => void;
  getIncludeInfo: () => Promise<IncludeInfo[]>;
  includeInfoLoading: boolean;
  setLoading: (loading: boolean) => void;
  updateIncludeInfo: (includeInfo: IncludeInfo[]) => Promise<void>;
}

export const useIncludeInfoStore = create(
  persist<IncludeInfoState>(
    (set, get) => ({
      includeInfo: [],
      includeInfoLoading: true,
      setLoading: (loading) => set({ includeInfoLoading: loading }),
      setIncludeInfo: (includeInfo) => set({ includeInfo }),
      getIncludeInfo: async () => {
        if (get().includeInfo.length === 0) {
          set({ includeInfoLoading: true });
          try {
            const response = await fetch("/api/dashboard/includeInfo");
            if (response.ok) {
              const data = (await response.json()) as IncludeInfo[];
              set({ includeInfo: data });
              return data;
            } else {
              console.error(
                "Erro ao buscar informações inclusas:",
                response.status
              );
              return [];
            }
          } catch (error) {
            console.error("Erro ao buscar informações inclusas:", error);
            return [];
          } finally {
            set({ includeInfoLoading: false });
          }
        } else {
          set({ includeInfoLoading: false });
          return get().includeInfo;
        }
      },
      updateIncludeInfo: async (includeInfo) => {
        set({ includeInfoLoading: true });
        try {
          const response = await fetch("/api/dashboard/includeInfo", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(includeInfo),
          });
          if (response.ok) {
            set({ includeInfo });
          } else {
            console.error(
              "Erro ao atualizar informações inclusas:",
              response.status
            );
          }
        } catch (error) {
          console.error("Erro ao atualizar informações inclusas:", error);
        } finally {
          set({ includeInfoLoading: false });
        }
      },
    }),
    {
      name: "includeInfo",
    }
  )
);

interface SocialMediaPostsState {
  socialMediaPosts: SocialMediaPost[];
  setSocialMediaPosts: (socialMediaPosts: SocialMediaPost[]) => void;
  getSocialMediaPosts: () => Promise<SocialMediaPost[]>;
  socialMediaPostsLoading: boolean;
  setLoading: (loading: boolean) => void;
  updateSocialMediaPosts: (
    socialMediaPosts: SocialMediaPost[]
  ) => Promise<void>;
}

export const useSocialMediaPostsStore = create(
  persist<SocialMediaPostsState>(
    (set, get) => ({
      socialMediaPosts: [],
      socialMediaPostsLoading: true,
      setLoading: (loading) => set({ socialMediaPostsLoading: loading }),
      setSocialMediaPosts: (socialMediaPosts) => set({ socialMediaPosts }),
      getSocialMediaPosts: async () => {
        if (get().socialMediaPosts.length === 0) {
          set({ socialMediaPostsLoading: true });
          try {
            const response = await fetch("/api/dashboard/socialMediaPosts");
            if (response.ok) {
              const data = (await response.json()) as SocialMediaPost[];
              set({ socialMediaPosts: data });
              return data;
            } else {
              console.error(
                "Erro ao buscar posts de mídia social:",
                response.status
              );
              return [];
            }
          } catch (error) {
            console.error("Erro ao buscar posts de mídia social:", error);
            return [];
          } finally {
            set({ socialMediaPostsLoading: false });
          }
        } else {
          set({ socialMediaPostsLoading: false });
          return get().socialMediaPosts;
        }
      },
      updateSocialMediaPosts: async (socialMediaPosts) => {
        set({ socialMediaPostsLoading: true });
        try {
          const response = await fetch("/api/dashboard/socialMediaPosts", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(socialMediaPosts),
          });
          if (response.ok) {
            set({ socialMediaPosts });
          } else {
            console.error(
              "Erro ao atualizar posts de mídia social:",
              response.status
            );
          }
        } catch (error) {
          console.error("Erro ao atualizar posts de mídia social:", error);
        } finally {
          set({ socialMediaPostsLoading: false });
        }
      },
    }),
    {
      name: "socialMediaPosts",
    }
  )
);

interface NewsState {
  news: News[];
  setNews: (news: News[]) => void;
  getNews: () => Promise<News[]>;
  newsLoading: boolean;
  setLoading: (loading: boolean) => void;
  updateNews: (news: News[]) => Promise<void>;
}

export const useNewsStore = create(
  persist<NewsState>(
    (set, get) => ({
      news: [],
      newsLoading: true,
      setLoading: (loading) => set({ newsLoading: loading }),
      setNews: (news) => set({ news }),
      getNews: async () => {
        if (get().news.length === 0) {
          set({ newsLoading: true });
          try {
            const response = await fetch("/api/dashboard/news");
            if (response.ok) {
              const data = (await response.json()) as News[];
              set({ news: data });
              return data;
            } else {
              console.error("Erro ao buscar notícias:", response.status);
              return [];
            }
          } catch (error) {
            console.error("Erro ao buscar notícias:", error);
            return [];
          } finally {
            set({ newsLoading: false });
          }
        } else {
          set({ newsLoading: false });
          return get().news;
        }
      },
      updateNews: async (news) => {
        set({ newsLoading: true });
        try {
          const response = await fetch("/api/dashboard/news", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(news),
          });
          if (response.ok) {
            set({ news });
          } else {
            console.error("Erro ao atualizar notícias:", response.status);
          }
        } catch (error) {
          console.error("Erro ao atualizar notícias:", error);
        } finally {
          set({ newsLoading: false });
        }
      },
    }),
    {
      name: "news",
    }
  )
);

interface TeamMembersState {
  teamMembers: TeamMember[];
  setTeamMembers: (teamMembers: TeamMember[]) => void;
  getTeamMembers: () => Promise<TeamMember[]>;
  teamMembersLoading: boolean;
  setLoading: (loading: boolean) => void;
  updateTeamMembers: (teamMembers: TeamMember[]) => Promise<void>;
}

export const useTeamMembersStore = create(
  persist<TeamMembersState>(
    (set, get) => ({
      teamMembers: [],
      teamMembersLoading: true,
      setLoading: (loading) => set({ teamMembersLoading: loading }),
      setTeamMembers: (teamMembers) => set({ teamMembers }),
      getTeamMembers: async () => {
        if (get().teamMembers.length === 0) {
          set({ teamMembersLoading: true });
          try {
            const response = await fetch("/api/dashboard/teamMembers");
            if (response.ok) {
              const data = (await response.json()) as TeamMember[];
              set({ teamMembers: data });
              return data;
            } else {
              console.error(
                "Erro ao buscar membros da equipe:",
                response.status
              );
              return [];
            }
          } catch (error) {
            console.error("Erro ao buscar membros da equipe:", error);
            return [];
          } finally {
            set({ teamMembersLoading: false });
          }
        } else {
          set({ teamMembersLoading: false });
          return get().teamMembers;
        }
      },
      updateTeamMembers: async (teamMembers) => {
        set({ teamMembersLoading: true });
        try {
          const response = await fetch("/api/dashboard/teamMembers", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(teamMembers),
          });
          if (response.ok) {
            set({ teamMembers });
          } else {
            console.error(
              "Erro ao atualizar membros da equipe:",
              response.status
            );
          }
        } catch (error) {
          console.error("Erro ao atualizar membros da equipe:", error);
        } finally {
          set({ teamMembersLoading: false });
        }
      },
    }),
    {
      name: "teamMembers",
    }
  )
);

interface ScholarshipMembersState {
  scholarshipMembers: ScholarshipMember[];
  setScholarshipMembers: (scholarshipMembers: ScholarshipMember[]) => void;
  getScholarshipMembers: () => Promise<ScholarshipMember[]>;
  scholarshipMembersLoading: boolean;
  setLoading: (loading: boolean) => void;
  updateScholarshipMembers: (
    scholarshipMembers: ScholarshipMember[]
  ) => Promise<void>;
}

export const useScholarshipMembersStore = create(
  persist<ScholarshipMembersState>(
    (set, get) => ({
      scholarshipMembers: [],
      scholarshipMembersLoading: true,
      setLoading: (loading) => set({ scholarshipMembersLoading: loading }),
      setScholarshipMembers: (scholarshipMembers) =>
        set({ scholarshipMembers }),
      getScholarshipMembers: async () => {
        if (get().scholarshipMembers.length === 0) {
          set({ scholarshipMembersLoading: true });
          try {
            const response = await fetch("/api/dashboard/scholarshipMembers");
            if (response.ok) {
              const data = (await response.json()) as ScholarshipMember[];
              set({ scholarshipMembers: data });
              return data;
            } else {
              console.error(
                "Erro ao buscar membros de bolsa:",
                response.status
              );
              return [];
            }
          } catch (error) {
            console.error("Erro ao buscar membros de bolsa:", error);
            return [];
          } finally {
            set({ scholarshipMembersLoading: false });
          }
        } else {
          set({ scholarshipMembersLoading: false });
          return get().scholarshipMembers;
        }
      },
      updateScholarshipMembers: async (scholarshipMembers) => {
        set({ scholarshipMembersLoading: true });
        try {
          const response = await fetch("/api/dashboard/scholarshipMembers", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(scholarshipMembers),
          });
          if (response.ok) {
            set({ scholarshipMembers });
          } else {
            console.error(
              "Erro ao atualizar membros de bolsa:",
              response.status
            );
          }
        } catch (error) {
          console.error("Erro ao atualizar membros de bolsa:", error);
        } finally {
          set({ scholarshipMembersLoading: false });
        }
      },
    }),
    {
      name: "scholarshipMembers",
    }
  )
);

interface OldMembersState {
  oldMembers: OldMember[];
  setOldMembers: (oldMembers: OldMember[]) => void;
  getOldMembers: () => Promise<OldMember[]>;
  oldMembersLoading: boolean;
  setLoading: (loading: boolean) => void;
  updateOldMembers: (oldMembers: OldMember[]) => Promise<void>;
}

export const useOldMembersStore = create(
  persist<OldMembersState>(
    (set, get) => ({
      oldMembers: [],
      oldMembersLoading: true,
      setLoading: (loading) => set({ oldMembersLoading: loading }),
      setOldMembers: (oldMembers) => set({ oldMembers }),
      getOldMembers: async () => {
        if (get().oldMembers.length === 0) {
          set({ oldMembersLoading: true });
          try {
            const response = await fetch("/api/dashboard/oldMembers");
            if (response.ok) {
              const data = (await response.json()) as OldMember[];
              set({ oldMembers: data });
              return data;
            } else {
              console.error("Erro ao buscar antigos membros:", response.status);
              return [];
            }
          } catch (error) {
            console.error("Erro ao buscar antigos membros:", error);
            return [];
          } finally {
            set({ oldMembersLoading: false });
          }
        } else {
          set({ oldMembersLoading: false });
          return get().oldMembers;
        }
      },
      updateOldMembers: async (oldMembers) => {
        set({ oldMembersLoading: true });
        try {
          const response = await fetch("/api/dashboard/oldMembers", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(oldMembers),
          });
          if (response.ok) {
            set({ oldMembers });
          } else {
            console.error(
              "Erro ao atualizar antigos membros:",
              response.status
            );
          }
        } catch (error) {
          console.error("Erro ao atualizar antigos membros:", error);
        } finally {
          set({ oldMembersLoading: false });
        }
      },
    }),
    {
      name: "oldMembers",
    }
  )
);

interface ActivitiesState {
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
  getActivities: () => Promise<Activity[]>;
  activitiesLoading: boolean;
  setLoading: (loading: boolean) => void;
  updateActivities: (activities: Activity[]) => Promise<void>;
}

export const useActivitiesStore = create(
  persist<ActivitiesState>(
    (set, get) => ({
      activities: [],
      activitiesLoading: true,

      setLoading: (loading) => set({ activitiesLoading: loading }),
      setActivities: (activities) => set({ activities }),

      getActivities: async () => {
        if (get().activities.length === 0) {
          set({ activitiesLoading: true });
          try {
            const response = await fetch("/api/dashboard/events");
            if (response.ok) {
              const data = (await response.json()) as Activity[];
              set({ activities: data });
              return data;
            } else {
              console.error("Erro ao buscar atividades:", response.status);
              return [];
            }
          } catch (error) {
            console.error("Erro ao buscar atividades:", error);
            return [];
          } finally {
            set({ activitiesLoading: false });
          }
        } else {
          set({ activitiesLoading: false });
          return get().activities;
        }
      },

      updateActivities: async (activities) => {
        set({ activitiesLoading: true });
        try {
          const response = await fetch("/api/dashboard/events", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(activities),
          });
          if (response.ok) {
            set({ activities });
          } else {
            console.error("Erro ao atualizar atividades:", response.status);
          }
        } catch (error) {
          console.error("Erro ao atualizar atividades:", error);
        } finally {
          set({ activitiesLoading: false });
        }
      },
    }),
    {
      name: "activities-storage",
    }
  )
);
