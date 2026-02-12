/*
 * Copyright 2025 Wildace Private Limited - All Rights Reserved
 *
 * Licensed under Wildace Software License Agreement ("License").
 * You may not use this file except in compliance with the License.
 *
 * NOTICE
 * ALL INFORMATION CONTAINED HEREIN IS, AND REMAINS THE PROPERTY OF WILDACE PRIVATE LIMITED.
 * THE INTELLECTUAL AND TECHNICAL CONCEPTS CONTAINED HEREIN ARE PROPRIETARY TO WILDACE PRIVATE LIMITED AND ARE PROTECTED BY TRADE SECRET OR COPYRIGHT LAW.
 * DISSEMINATION OF THIS INFORMATION OR REPRODUCTION OF THIS MATERIAL IS STRICTLY FORBIDDEN UNLESS PRIOR WRITTEN PERMISSION IS OBTAINED FROM WILDACE PRIVATE LIMITED.
 * **********************************************************************************************************************************************************************
 * Change History
 * **********************************************************************************************************************************************************************
 * |     Date      |     Name     |      Change     |      Details
 * |  01/08/2025   | Wilson Sam   |     Created     |  File Creation
 * **********************************************************************************************************************************************************************
 * */
import { useState, useEffect } from "react";

function fetchImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = image.onabort = reject;
    image.src = src;
  });
}

export function usePreloadImage({ src, fallback }) {
  const [loaded, setLoaded] = useState(false);
  const [source, setSource] = useState(src);
  useEffect(() => {
    setLoaded(false);
    fetchImage(src)
      .then(() => {
        setSource(src);
        setLoaded(true);
      })
      .catch(() => {
        if (fallback) {
          fetchImage(fallback)
            .then(() => {
              setSource(fallback);
              setLoaded(true);
            })
            .catch(() => {
              setLoaded(false);
            });
        }
      });
  }, [src, fallback]);
  return {
    loaded,
    src: source,
  };
}
