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
import axios from "axios";

export class NodeService {
  getFiles(_this) {
    return axios
      .get("assets/demo/data/files.json")
      .then((res) => res.data.data)
      .then((data) => {
        _this.setState({ files: data });
        return data;
      });
  }

  getFilesystem(_this) {
    return axios
      .get("assets/demo/data/filesystem.json")
      .then((res) => res.data.data)
      .then((data) => {
        _this.setState({ files: data });
        return data;
      });
  }

  getTreeNodes() {
    return axios
      .get("assets/demo/data/treenodes.json")
      .then((res) => res.data.root);
  }

  getTreeTableNodes() {
    return axios
      .get("assets/demo/data/treetablenodes.json")
      .then((res) => res.data.root);
  }
}
