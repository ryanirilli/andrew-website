//@ flow
import * as APP from "../action-types/app.action-types";

export const setBreakpointName = (breakpoint: string): void => {
  return {
    type: APP.SET_BREAKPOINT,
    breakpoint
  };
};

const setVideos = videos => ({
  type: APP.SET_VIDEOS,
  videos
});

const setPhotos = photos => ({
  type: APP.SET_PHOTOS,
  photos
});

export const fetchVideos = () => {
  return async dispatch => {
    const res = await fetch("/api/v1/videos");
    const json = await res.json();
    dispatch(setVideos(json));
  };
};

export const fetchPhotos = () => {
  return async dispatch => {
    const res = await fetch("/api/v1/photos");
    const json = await res.json();
    dispatch(setPhotos(json.photos));
  };
};
